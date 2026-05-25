// ============================
// brain.ts — สมองของระบบ
// หน้าที่: รับหัวข้อจากผู้ใช้ → ส่งให้ AI วิเคราะห์ → สร้าง content ทั้งหมด
// input: หัวข้อ (string) เช่น "เกมส์"
// output: { brief, caption, hashtags, imagePrompt }
// ============================

import { readFileSync, readdirSync } from "fs";
import { join } from "path";

// ============================
// ส่วนที่ 1: โหลด config
// อ่านค่า AI provider, model, language จากไฟล์ config/app.json
// ============================

interface AppConfig {
  ai: { provider: string; model: string; language: string; max_tokens: number };
  image: { provider: string; model: string; style: string; size: string };
  defaults: { content_type: string; tone: string; hashtag_count: number; output_dir: string };
}

interface Template {
  name: string;
  description: string;
  system_prompt: string;
  tone: string;
  hashtags_base: string[];
  image_style: string;
}

interface BrainOutput {
  brief: {
    topic: string;
    content_type: string;
    tone: string;
    style: string;
    template_used: string | null;
  };
  caption: string;
  hashtags: string[];
  imagePrompt: string;
}

function loadConfig(): AppConfig {
  return JSON.parse(readFileSync(join(__dirname, "../config/app.json"), "utf-8"));
}

// ============================
// ส่วนที่ 2: หา template ที่เหมาะกับหัวข้อ
// สแกนไฟล์ใน config/templates/ → เทียบชื่อ/description กับหัวข้อ
// ถ้าเจอ template ที่ตรง → ใช้ system_prompt + hashtags_base + image_style จาก template
// ถ้าไม่เจอ → ใช้ค่า default
// ============================

function findTemplate(topic: string): Template | null {
  const templatesDir = join(__dirname, "../config/templates");
  try {
    const files = readdirSync(templatesDir).filter((f) => f.endsWith(".json"));
    const templates: any[] = files.map((f) =>
      JSON.parse(readFileSync(join(templatesDir, f), "utf-8"))
    );
    const topicLower = topic.toLowerCase();

    // --- ลำดับที่ 1: match keywords จาก template (ชัดเจนที่สุด) ---
    for (const t of templates) {
      const keywords: string[] = t.keywords ?? [];
      if (keywords.some((kw: string) => topicLower.includes(kw.toLowerCase()))) return t;
    }

    // --- ลำดับที่ 2: match ชื่อ template ตรงๆ ---
    for (const t of templates) {
      if (topicLower.includes(t.name.toLowerCase())) return t;
    }
  } catch {}
  return null;
}

// ============================
// ส่วนที่ 3: ส่งหัวข้อให้ AI วิเคราะห์ + สร้าง content
// 1. สร้าง prompt จากหัวข้อ + template (ถ้ามี)
// 2. ส่งไป Claude API
// 3. รับ JSON กลับมา: caption, hashtags, image prompt
// 4. return ผลลัพธ์ทั้งหมด
// ============================

export async function generateContent(topic: string): Promise<BrainOutput> {
  const config = loadConfig();
  const template = findTemplate(topic);

  const systemPrompt = template
    ? template.system_prompt
    : `คุณเป็นนักเขียน content มืออาชีพ เขียนภาษาไทย ให้สนุก viral ได้`;

  const imageStyle = template
    ? template.image_style
    : config.image.style;

  const baseHashtags = template
    ? template.hashtags_base
    : [];

  const userPrompt = `สร้าง social media content เกี่ยวกับ: "${topic}"

ตอบเป็น JSON เท่านั้น ไม่ต้องมี markdown code block ตอบ JSON ตรงๆ:
{
  "caption": "ข้อความ caption ภาษาไทย 2-4 ประโยค สั้น กระชับ viral ได้",
  "hashtags": ["#hashtag1", "#hashtag2", ...],
  "image_prompt": "English prompt for AI image generation, ${imageStyle}, high quality, social media ready"
}

กฎ:
- caption ต้องภาษาไทย สั้น กระชับ อ่านง่าย มี hook แรก
- hashtags ${config.defaults.hashtag_count} อัน ผสมไทย+อังกฤษ
- image_prompt ต้องเป็นภาษาอังกฤษ ละเอียดพอสร้างรูปได้`;

  // --- เรียก AI API (Gemini หรือ Claude ตาม config) ---
  let text = "";

  if (config.ai.provider === "gemini") {
    // --- Gemini API ---
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not set");

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${config.ai.model}:generateContent?key=${apiKey}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: { maxOutputTokens: config.ai.max_tokens, temperature: 0.8 },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini API error ${res.status}: ${err.slice(0, 200)}`);
    }

    const data = (await res.json()) as any;
    text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  } else if (config.ai.provider === "groq") {
    // --- Groq API (free, fast, llama models) ---
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY not set");

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: config.ai.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: config.ai.max_tokens,
        temperature: 0.8,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Groq API error ${res.status}: ${err.slice(0, 200)}`);
    }

    const data = (await res.json()) as any;
    text = data?.choices?.[0]?.message?.content ?? "";
  } else {
    // --- Claude API (ต้องมี ANTHROPIC_API_KEY) ---
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic();
    const response = await client.messages.create({
      model: config.ai.model,
      max_tokens: config.ai.max_tokens,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });
    const firstBlock = response.content[0];
    text = firstBlock && firstBlock.type === "text" ? firstBlock.text : "";
  }

  // --- แปลง response เป็น JSON ---
  let parsed: { caption: string; hashtags: string[]; image_prompt: string };

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch ? jsonMatch[0] : text);
  } catch {
    parsed = {
      caption: text.slice(0, 500),
      hashtags: baseHashtags,
      image_prompt: `${topic}, ${imageStyle}, social media content`,
    };
  }

  // --- รวม hashtags จาก template + AI ---
  const allHashtags = [...new Set([...baseHashtags, ...parsed.hashtags])].slice(
    0,
    config.defaults.hashtag_count
  );

  return {
    brief: {
      topic,
      content_type: "image_post",
      tone: template?.tone ?? config.defaults.tone,
      style: imageStyle,
      template_used: template?.name ?? null,
    },
    caption: parsed.caption,
    hashtags: allHashtags,
    imagePrompt: parsed.image_prompt,
  };
}
