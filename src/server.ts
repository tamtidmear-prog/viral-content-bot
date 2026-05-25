// ============================
// server.ts — Web UI Server
// รัน: bun run src/server.ts
// เปิด: http://localhost:3939
// ============================

import { readdir, readFile, mkdir, writeFile, unlink } from "fs/promises";
import { join, extname } from "path";
import { generateContent } from "./brain";
import { checkToken, exchangeLongLived, getPageToken, listPages, fullTokenExchange } from "./token";

// ============================
// ส่วนที่ 1: Config & Constants
// ============================

const PORT = 3939;
const PUBLIC_DIR = join(import.meta.dir, "../public");
const CONFIG_DIR = join(import.meta.dir, "../config");
const OUTPUT_DIR = join(import.meta.dir, "../output");
const UPLOAD_DIR = join(import.meta.dir, "../.tmp/uploads");

await mkdir(UPLOAD_DIR, { recursive: true });

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

// ============================
// ส่วนที่ 2: Helper Functions
// ============================

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function loadPlatforms() {
  try {
    const raw = await readFile(join(CONFIG_DIR, "platforms.json"), "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function loadTemplates() {
  try {
    const dir = join(CONFIG_DIR, "templates");
    const files = await readdir(dir);
    const templates = [];
    for (const f of files) {
      if (f.endsWith(".json")) {
        const raw = await readFile(join(dir, f), "utf-8");
        templates.push(JSON.parse(raw));
      }
    }
    return templates;
  } catch {
    return [];
  }
}

// ============================
// ส่วนที่ 3: Facebook API Functions
// ============================

async function fbUploadPhoto(pageId: string, token: string, imagePath: string): Promise<string> {
  const form = new FormData();
  const imageData = await readFile(imagePath);
  const blob = new Blob([imageData], { type: "image/png" });
  form.append("source", blob, "image.png");
  form.append("published", "false");
  form.append("access_token", token);

  const res = await fetch(`https://graph.facebook.com/v25.0/${pageId}/photos`, {
    method: "POST",
    body: form,
  });
  const data = await res.json() as any;
  if (data.error) throw new Error(data.error.message);
  return data.id;
}

async function fbPostWithPhotos(pageId: string, token: string, message: string, photoIds: string[], privacy?: string, schedule?: string) {
  const params = new URLSearchParams();
  params.append("message", message);
  params.append("access_token", token);
  photoIds.forEach((id, i) => {
    params.append(`attached_media[${i}]`, JSON.stringify({ media_fbid: id }));
  });
  if (schedule) {
    params.append("scheduled_publish_time", String(Math.floor(new Date(schedule).getTime() / 1000)));
    params.append("published", "false");
  }

  const res = await fetch(`https://graph.facebook.com/v25.0/${pageId}/feed`, {
    method: "POST",
    body: params,
  });
  return await res.json();
}

async function fbPostTextOnly(pageId: string, token: string, message: string, privacy?: string, schedule?: string) {
  const params = new URLSearchParams();
  params.append("message", message);
  params.append("access_token", token);
  if (schedule) {
    params.append("scheduled_publish_time", String(Math.floor(new Date(schedule).getTime() / 1000)));
    params.append("published", "false");
  }

  const res = await fetch(`https://graph.facebook.com/v25.0/${pageId}/feed`, {
    method: "POST",
    body: params,
  });
  return await res.json();
}

// ============================
// ส่วนที่ 4: API Route Handler
// ============================

async function handleAPI(req: Request, path: string): Promise<Response> {
  // GET /api/pages — รายชื่อ page ที่ใช้ได้
  if (path === "/api/pages" && req.method === "GET") {
    const platforms = await loadPlatforms();
    const pagesConfig = platforms.facebook?.pages || {};
    const pages = Object.values(pagesConfig) as { id: string; name: string }[];
    if (pages.length === 0) {
      pages.push(
        { id: "1184469221407318", name: "Prism Chronicle" },
        { id: "108423905655889", name: "Ai_In_Mind" },
        { id: "811730625603539", name: "Forex EAI Expert" },
        { id: "137411833080593", name: "Cakekhunaoy By Sweetjeed" },
      );
    }
    const currentPageId = platforms.facebook?.page_id || "1184469221407318";
    return json({ pages, currentPageId });
  }

  // GET /api/templates — template ทั้งหมด
  if (path === "/api/templates" && req.method === "GET") {
    const templates = await loadTemplates();
    return json(templates);
  }

  // POST /api/generate — AI สร้าง caption/hashtag จากหัวข้อ
  if (path === "/api/generate" && req.method === "POST") {
    try {
      const body = await req.json() as any;
      const content = await generateContent(body.topic);
      return json(content);
    } catch (err: any) {
      return json({ error: err.message }, 500);
    }
  }

  // POST /api/upload — อัพโหลดรูป (เก็บ temp)
  if (path === "/api/upload" && req.method === "POST") {
    try {
      const form = await req.formData();
      const files = form.getAll("images") as File[];
      const saved: string[] = [];

      for (const file of files) {
        const name = `${Date.now()}_${file.name}`;
        const buf = await file.arrayBuffer();
        const filePath = join(UPLOAD_DIR, name);
        await writeFile(filePath, Buffer.from(buf));
        saved.push(name);
      }

      return json({ files: saved });
    } catch (err: any) {
      return json({ error: err.message }, 500);
    }
  }

  // POST /api/post — โพสไป Facebook
  if (path === "/api/post" && req.method === "POST") {
    try {
      const body = await req.json() as any;
      const { pageId, caption, hashtags, images, privacy, schedule } = body;

      // ดึง page token จาก user token ทุกครั้ง (ให้ถูกเพจ)
      const platforms = await loadPlatforms();
      const userToken = platforms.facebook?.user_access_token || platforms.facebook?.access_token || "";
      const tokenRes = await fetch(
        `https://graph.facebook.com/v25.0/${pageId}?fields=access_token&access_token=${userToken}`
      );
      const tokenData = await tokenRes.json() as any;
      const token = tokenData.access_token || "";

      if (!token) {
        return json({ error: "ไม่มี access token — ตั้งค่าใน config/platforms.json" }, 400);
      }

      const message = hashtags ? `${caption}\n\n${hashtags}` : caption;

      let result: any;

      if (images && images.length > 0) {
        // อัพโหลดรูปทั้งหมดเป็น unpublished
        const photoIds: string[] = [];
        for (const img of images) {
          const imgPath = join(UPLOAD_DIR, img);
          const photoId = await fbUploadPhoto(pageId, token, imgPath);
          photoIds.push(photoId);
        }
        // โพส multi-photo
        result = await fbPostWithPhotos(pageId, token, message, photoIds, privacy, schedule);

        // ลบ temp files
        for (const img of images) {
          await unlink(join(UPLOAD_DIR, img)).catch(() => {});
        }
      } else {
        result = await fbPostTextOnly(pageId, token, message, privacy, schedule);
      }

      if ((result as any).error) {
        return json({ error: (result as any).error.message }, 400);
      }

      // บันทึก log
      const logDir = join(OUTPUT_DIR, `${new Date().toISOString().slice(0, 10)}_web-post`);
      await mkdir(logDir, { recursive: true });
      await writeFile(
        join(logDir, `${Date.now()}.json`),
        JSON.stringify({ pageId, caption, hashtags, images, result, timestamp: new Date().toISOString() }, null, 2)
      );

      const postId = (result as any).id || "";
      const postUrl = `https://facebook.com/${postId.replace("_", "/posts/")}`;
      return json({ success: true, postId, postUrl });
    } catch (err: any) {
      return json({ error: err.message }, 500);
    }
  }

  // GET /api/history — ประวัติโพส
  if (path === "/api/history" && req.method === "GET") {
    try {
      const dirs = await readdir(OUTPUT_DIR);
      const history: any[] = [];

      for (const dir of dirs.sort().reverse().slice(0, 20)) {
        const dirPath = join(OUTPUT_DIR, dir);
        try {
          const files = await readdir(dirPath);
          const logFile = files.find(f => f === "full-log.json" || f.endsWith(".json"));
          if (logFile) {
            const raw = await readFile(join(dirPath, logFile), "utf-8");
            const data = JSON.parse(raw);
            history.push({ folder: dir, ...data });
          }
        } catch {}
      }

      return json(history);
    } catch {
      return json([]);
    }
  }

  // ============================
  // Token Management APIs
  // ============================

  // GET /api/token/status — เช็ค token ปัจจุบัน
  if (path === "/api/token/status" && req.method === "GET") {
    const platforms = await loadPlatforms();
    const userToken = platforms.facebook?.user_access_token || "";
    const pageToken = platforms.facebook?.access_token || "";

    const [userInfo, pageInfo] = await Promise.all([
      userToken ? checkToken(userToken) : null,
      pageToken ? checkToken(pageToken) : null,
    ]);

    return json({
      user_token: userInfo || { valid: false, error: "no token" },
      page_token: pageInfo || { valid: false, error: "no token" },
      page_id: platforms.facebook?.page_id || "",
    });
  }

  // POST /api/token/exchange — exchange short-lived → long-lived → page tokens
  if (path === "/api/token/exchange" && req.method === "POST") {
    try {
      const body = await req.json() as any;
      const { short_lived_token, app_id, app_secret, page_ids } = body;

      if (!short_lived_token || !app_id || !app_secret) {
        return json({ error: "ต้องมี short_lived_token, app_id, app_secret" }, 400);
      }

      const targetPages = page_ids || ["108423905655889"];
      const result = await fullTokenExchange(short_lived_token, app_id, app_secret, targetPages);

      return json(result);
    } catch (err: any) {
      return json({ error: err.message }, 500);
    }
  }

  // POST /api/token/update — อัปเดต token ตรงๆ (ไม่ exchange)
  if (path === "/api/token/update" && req.method === "POST") {
    try {
      const body = await req.json() as any;
      const { user_access_token, page_id, access_token } = body;

      const platforms = await loadPlatforms();
      if (user_access_token) platforms.facebook.user_access_token = user_access_token;
      if (page_id) platforms.facebook.page_id = page_id;
      if (access_token) platforms.facebook.access_token = access_token;

      await writeFile(join(CONFIG_DIR, "platforms.json"), JSON.stringify(platforms, null, 2));
      return json({ success: true });
    } catch (err: any) {
      return json({ error: err.message }, 500);
    }
  }

  // GET /api/token/pages — list pages ที่เข้าถึงได้
  if (path === "/api/token/pages" && req.method === "GET") {
    const platforms = await loadPlatforms();
    const userToken = platforms.facebook?.user_access_token || "";
    if (!userToken) return json({ pages: [], error: "no user token" });

    const pages = await listPages(userToken);
    return json({ pages });
  }

  return json({ error: "Not found" }, 404);
}

// ============================
// ส่วนที่ 5: Static File Server
// ============================

async function serveStatic(path: string): Promise<Response> {
  const filePath = path === "/" ? join(PUBLIC_DIR, "index.html") : join(PUBLIC_DIR, path);
  try {
    const file = Bun.file(filePath);
    if (await file.exists()) {
      const ext = extname(filePath);
      return new Response(file, {
        headers: { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" },
      });
    }
  } catch {}
  return new Response("Not Found", { status: 404 });
}

// ============================
// ส่วนที่ 6: Main Server
// ============================

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/api/")) {
      return handleAPI(req, url.pathname);
    }

    // serve uploaded images for preview
    if (url.pathname.startsWith("/uploads/")) {
      const name = url.pathname.replace("/uploads/", "");
      const file = Bun.file(join(UPLOAD_DIR, name));
      if (await file.exists()) {
        return new Response(file, {
          headers: { "Content-Type": "image/png" },
        });
      }
      return new Response("Not Found", { status: 404 });
    }

    return serveStatic(url.pathname);
  },
});

console.log("============================");
console.log("Viral Content Bot — Web UI");
console.log(`http://localhost:${PORT}`);
console.log("============================");
