import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "fs";

const APP_ID = "1934309713951680";
const REDIRECT = "https://developers.facebook.com/tools/explorer/";
const SCOPE = "pages_manage_posts,pages_read_engagement,pages_manage_engagement,pages_show_list";
const SESSION_PATH = new URL("../.fb-session/state.json", import.meta.url).pathname;

const OAUTH_URL = `https://www.facebook.com/dialog/oauth?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT)}&scope=${SCOPE}&response_type=token`;

async function main() {
  console.log("Loading saved session...");
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: SESSION_PATH });
  const page = await context.newPage();

  console.log("Navigating to OAuth...");
  await page.goto(OAUTH_URL, { waitUntil: "networkidle", timeout: 30000 });

  // Wait for redirect or manual authorization
  console.log("Waiting for token redirect (max 120s)...");
  console.log("If FB asks to authorize, please click Continue/Authorize in the browser.");

  let token = "";
  for (let i = 0; i < 60; i++) {
    const url = page.url();
    const hash = url.split("#")[1] || "";
    const match = hash.match(/access_token=([^&]+)/);
    if (match) {
      token = decodeURIComponent(match[1]);
      break;
    }
    await page.waitForTimeout(2000);
  }

  if (token) {
    console.log(`\n✅ User Access Token (length: ${token.length}):`);
    console.log(token);

    // Get Page Access Tokens
    console.log("\nFetching Page tokens...");
    const res = await fetch(
      `https://graph.facebook.com/v25.0/me/accounts?fields=name,id,access_token&access_token=${token}`
    );
    const data = (await res.json()) as any;
    if (data.data) {
      for (const p of data.data) {
        console.log(`\nPage: ${p.name} (${p.id})`);
        console.log(`Token (${p.access_token.length} chars): ${p.access_token}`);
      }
    }
  } else {
    console.log("❌ Token not captured. Try manually in the browser.");
  }

  // Save session
  await context.storageState({ path: SESSION_PATH });
  console.log("\nSession saved. Closing in 5s...");
  await page.waitForTimeout(5000);
  await browser.close();
}

main().catch(console.error);
