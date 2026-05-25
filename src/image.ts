// ============================
// image.ts — ส่วนสร้างรูปภาพ
// หน้าที่: รับ image prompt จาก brain → ส่งให้ AI วาดรูป → บันทึกเป็นไฟล์
// input: imagePrompt (string), outputPath (string)
// output: ไฟล์รูป .png ที่ outputPath
// ============================

import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

// ============================
// ส่วนที่ 1: โหลด config
// อ่านค่า image provider, model, API key จาก config/app.json
// ============================

interface ImageConfig {
  image: { provider: string; model: string; style: string; size: string };
}

function loadConfig(): ImageConfig {
  return JSON.parse(readFileSync(join(__dirname, "../config/app.json"), "utf-8"));
}

// ============================
// ส่วนที่ 2: สร้างรูปด้วย Gemini Imagen API
// ส่ง prompt ไป Gemini → รับรูปกลับมาเป็น base64 → บันทึกเป็นไฟล์ .png
// ใช้ Gemini เพราะมี API key อยู่แล้ว + ฟรี
// ============================

async function generateWithGemini(prompt: string, outputPath: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not set — ใส่ใน environment หรือ .env");
  }

  // --- ใช้ Imagen model สำหรับสร้างรูป (ไม่ใช่ text model) ---
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: `High-quality social media image: ${prompt}` }],
      parameters: { sampleCount: 1, aspectRatio: "1:1" },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err.slice(0, 200)}`);
  }

  const data = (await response.json()) as any;

  // --- Imagen API: ผลอยู่ใน predictions[0].bytesBase64Encoded ---
  const predictions = data?.predictions ?? [];
  if (predictions.length > 0 && predictions[0].bytesBase64Encoded) {
    const buffer = Buffer.from(predictions[0].bytesBase64Encoded, "base64");
    writeFileSync(outputPath, buffer);
    return outputPath;
  }

  // --- Fallback: ลองหา inlineData แบบ Gemini generateContent ---
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.inlineData?.data) {
      const buffer = Buffer.from(part.inlineData.data, "base64");
      writeFileSync(outputPath, buffer);
      return outputPath;
    }
  }

  throw new Error("AI ไม่ได้ส่งรูปกลับมา");
}

// ============================
// ส่วนที่ 3: Fallback — สร้าง placeholder image
// ถ้า AI สร้างรูปไม่ได้ → สร้างไฟล์ข้อความแทน บอกว่าต้องใส่รูปเอง
// ระบบยังทำงานต่อได้ โพส caption อย่างเดียวก็ได้
// ============================

function createPlaceholder(prompt: string, outputPath: string): string {
  const placeholderPath = outputPath.replace(".png", ".txt");
  writeFileSync(
    placeholderPath,
    `[PLACEHOLDER — ยังไม่มีรูป]\n\nImage Prompt:\n${prompt}\n\nใส่รูปเองที่: ${outputPath}\nหรือรอ Phase 4 ที่จะมี image gen API เต็มรูปแบบ`
  );
  return placeholderPath;
}

// ============================
// ส่วนที่ 4: Function หลัก — เรียกจากภายนอก
// ลอง AI สร้างรูปก่อน → ถ้าไม่ได้ fallback เป็น placeholder
// return: path ของไฟล์รูป (หรือ placeholder)
// ============================

export async function generateImage(
  prompt: string,
  outputPath: string
): Promise<{ path: string; type: "generated" | "placeholder" }> {
  const config = loadConfig();

  console.log(`[Image] กำลังสร้างรูป... (provider: ${config.image.provider})`);

  try {
    if (config.image.provider === "gemini") {
      const path = await generateWithGemini(prompt, outputPath);
      console.log(`[Image] สร้างรูปสำเร็จ → ${path}`);
      return { path, type: "generated" };
    }

    // --- เพิ่ม provider อื่นได้ที่นี่ (nanobanana, dall-e, kling) ---
    throw new Error(`Unknown image provider: ${config.image.provider}`);
  } catch (err: any) {
    console.warn(`[Image] สร้างรูปไม่ได้: ${err.message}`);
    console.log(`[Image] ใช้ placeholder แทน — โพส caption อย่างเดียวได้`);
    const path = createPlaceholder(prompt, outputPath);
    return { path, type: "placeholder" };
  }
}
