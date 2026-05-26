import { readFileSync } from "fs";

const CONFIG_PATH = new URL("../config/platforms.json", import.meta.url).pathname;
const config = JSON.parse(readFileSync(CONFIG_PATH, "utf-8"));
const TOKEN = config.facebook.pages.ai_in_mind.access_token;
const PAGE_ID = "108423905655889";
const API = "https://graph.facebook.com/v25.0";

const IMAGE_PATHS = [
  "/mnt/c/Users/mamip/Downloads/Flux_img/w12 (3)/undefined_image (78).png",
  "/mnt/c/Users/mamip/Downloads/Flux_img/w12 (3)/undefined_image (83).png",
  "/mnt/c/Users/mamip/Downloads/Flux_img/w12 (3)/undefined_image (87).png",
  "/mnt/c/Users/mamip/Downloads/Flux_img/w12 (3)/undefined_image (93).png",
];

const CAPTION = `✨ 4 ทรงผม 4 สไตล์ 4 ความน่ารัก ✨

เมื่อ AI วาดสาวสวย 🎨
แต่ละภาพสร้างขึ้นด้วย AI ล้วนๆ ไม่ใช่ถ่ายจากนางแบบจริง!
แต่ทำไมมันสมจริงจนต้องมองสองรอบ? 👀

ผมมวยดอกไม้ 💐 | ผมหยักโศก 🌸 | ผมมัดต่ำ 🎀 | ผมสั้นบ๊อบ 🔥
4 Look ที่ AI จัดให้ — ทุกอย่างสร้างขึ้นจาก pixel + prompt เพียงไม่กี่บรรทัด

🤖 AI ไม่ได้แค่ช่วยงาน — มันสร้างความงามได้ด้วย!
โพสนี้ทั้งหมด รวมถึงการจัดการ caption hashtag และเลือกภาพ
ดำเนินการโดย AI ทั้งสิ้น 100% ✨

📌 ทุกภาพ Generate ด้วย AI — ไม่มีนางแบบจริงแม้แต่คนเดียว
ชอบ Style ไหนมากที่สุด? คอมเม้นบอกได้เลย! ⬇️

#AIArt #AIPortrait #GenerativeAI #AIBeauty #AiInMind
#ภาพAI #AIไทย #ปัญญาประดิษฐ์ #เทคโนโลยี #AIสร้างสรรค์`;

async function uploadPhoto(imagePath: string): Promise<string> {
  const imageData = readFileSync(imagePath);
  const blob = new Blob([imageData], { type: "image/png" });
  const form = new FormData();
  form.append("source", blob, "photo.png");
  form.append("published", "false");
  form.append("access_token", TOKEN);

  const res = await fetch(`${API}/${PAGE_ID}/photos`, { method: "POST", body: form });
  const data = await res.json() as any;
  if (!data.id) throw new Error(`Upload failed: ${JSON.stringify(data)}`);
  console.log(`Uploaded: ${imagePath.split("/").pop()} → id: ${data.id}`);
  return data.id;
}

async function main() {
  console.log("Uploading 4 photos as unpublished...");
  const photoIds: string[] = [];
  for (const path of IMAGE_PATHS) {
    const id = await uploadPhoto(path);
    photoIds.push(id);
  }

  console.log("\nCreating multi-photo post...");
  const attachedMedia = photoIds.map((id) => ({ media_fbid: id }));
  const form = new FormData();
  form.append("message", CAPTION);
  form.append("attached_media", JSON.stringify(attachedMedia));
  form.append("access_token", TOKEN);

  const res = await fetch(`${API}/${PAGE_ID}/feed`, { method: "POST", body: form });
  const data = await res.json() as any;

  if (data.id) {
    console.log(`\n✅ Posted! post_id: ${data.id}`);
  } else {
    console.error("❌ Post failed:", JSON.stringify(data, null, 2));
  }
}

main().catch(console.error);
