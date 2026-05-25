// ============================
// token.ts — จัดการ Facebook Token
// หน้าที่: exchange short-lived → long-lived → permanent page token
// ============================

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// ============================
// ส่วนที่ 1: Config paths
// ============================

const PLATFORMS_PATH = join(__dirname, "../config/platforms.json");
const API_VERSION = "v25.0";
const GRAPH_URL = `https://graph.facebook.com/${API_VERSION}`;

// ============================
// ส่วนที่ 2: อ่าน/เขียน platforms.json
// ============================

function loadPlatforms(): any {
  return JSON.parse(readFileSync(PLATFORMS_PATH, "utf-8"));
}

function savePlatforms(data: any): void {
  writeFileSync(PLATFORMS_PATH, JSON.stringify(data, null, 2));
}

// ============================
// ส่วนที่ 3: ตรวจสอบ token ว่ายังใช้ได้ไหม
// ส่ง GET /debug_token → ดู is_valid + expires_at
// ============================

export interface TokenInfo {
  valid: boolean;
  type: string;
  expiresAt: string | null;
  scopes: string[];
  error?: string;
}

export async function checkToken(token: string): Promise<TokenInfo> {
  try {
    const res = await fetch(
      `${GRAPH_URL}/debug_token?input_token=${token}&access_token=${token}`
    );
    const data = (await res.json()) as any;

    if (data.error) {
      return { valid: false, type: "unknown", expiresAt: null, scopes: [], error: data.error.message };
    }

    const info = data.data;
    const expiresAt = info.expires_at
      ? new Date(info.expires_at * 1000).toISOString()
      : "never";

    return {
      valid: info.is_valid,
      type: info.type || "unknown",
      expiresAt,
      scopes: info.scopes || [],
    };
  } catch (err: any) {
    return { valid: false, type: "unknown", expiresAt: null, scopes: [], error: err.message };
  }
}

// ============================
// ส่วนที่ 4: Exchange short-lived → long-lived token (60 วัน)
// ต้องมี App ID + App Secret
// GET /oauth/access_token?grant_type=fb_exchange_token&...
// ============================

export interface ExchangeResult {
  success: boolean;
  token?: string;
  expiresIn?: number;
  error?: string;
}

export async function exchangeLongLived(
  shortLivedToken: string,
  appId: string,
  appSecret: string
): Promise<ExchangeResult> {
  try {
    const params = new URLSearchParams({
      grant_type: "fb_exchange_token",
      client_id: appId,
      client_secret: appSecret,
      fb_exchange_token: shortLivedToken,
    });

    const res = await fetch(`${GRAPH_URL}/oauth/access_token?${params}`);
    const data = (await res.json()) as any;

    if (data.error) {
      return { success: false, error: data.error.message };
    }

    return {
      success: true,
      token: data.access_token,
      expiresIn: data.expires_in,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ============================
// ส่วนที่ 5: ดึง Page Access Token จาก long-lived user token
// GET /{page_id}?fields=access_token → page token ที่ไม่หมดอายุ
// ============================

export interface PageTokenResult {
  success: boolean;
  pageId?: string;
  pageName?: string;
  token?: string;
  error?: string;
}

export async function getPageToken(
  userToken: string,
  pageId: string
): Promise<PageTokenResult> {
  try {
    const res = await fetch(
      `${GRAPH_URL}/${pageId}?fields=id,name,access_token&access_token=${userToken}`
    );
    const data = (await res.json()) as any;

    if (data.error) {
      return { success: false, error: data.error.message };
    }

    return {
      success: true,
      pageId: data.id,
      pageName: data.name,
      token: data.access_token,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ============================
// ส่วนที่ 6: List ทุก page ที่ user token เข้าถึงได้
// GET /me/accounts → list pages
// ============================

export interface PageInfo {
  id: string;
  name: string;
  category: string;
}

export async function listPages(userToken: string): Promise<PageInfo[]> {
  try {
    const res = await fetch(
      `${GRAPH_URL}/me/accounts?fields=id,name,category&access_token=${userToken}`
    );
    const data = (await res.json()) as any;

    if (data.error) return [];
    return (data.data || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      category: p.category || "",
    }));
  } catch {
    return [];
  }
}

// ============================
// ส่วนที่ 7: Full exchange flow
// short-lived → long-lived → page tokens → save to config
// ============================

export interface FullExchangeResult {
  success: boolean;
  longLivedToken?: string;
  expiresIn?: number;
  pages: PageTokenResult[];
  error?: string;
}

export async function fullTokenExchange(
  shortLivedToken: string,
  appId: string,
  appSecret: string,
  pageIds: string[]
): Promise<FullExchangeResult> {
  // Step 1: Exchange short → long-lived
  const longLived = await exchangeLongLived(shortLivedToken, appId, appSecret);
  if (!longLived.success || !longLived.token) {
    return { success: false, pages: [], error: `Long-lived exchange failed: ${longLived.error}` };
  }

  // Step 2: Get page tokens for each page
  const pageResults: PageTokenResult[] = [];
  for (const pageId of pageIds) {
    const pageToken = await getPageToken(longLived.token, pageId);
    pageResults.push(pageToken);
  }

  // Step 3: Save to platforms.json
  const platforms = loadPlatforms();
  platforms.facebook.user_access_token = longLived.token;

  // Save first successful page token as default
  const firstSuccess = pageResults.find(p => p.success);
  if (firstSuccess && firstSuccess.token) {
    platforms.facebook.access_token = firstSuccess.token;
    platforms.facebook.page_id = firstSuccess.pageId;
  }

  savePlatforms(platforms);

  return {
    success: true,
    longLivedToken: longLived.token,
    expiresIn: longLived.expiresIn,
    pages: pageResults,
  };
}
