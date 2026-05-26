import { chromium } from "playwright";

const APP_ID = "1934309713951680";
const REDIRECT = "https://developers.facebook.com/tools/explorer/";
const SCOPE = "pages_manage_posts,pages_read_engagement,pages_manage_engagement,pages_show_list";
const SESSION_PATH = new URL("../.fb-session/state.json", import.meta.url).pathname;

const OAUTH_URL = `https://www.facebook.com/dialog/oauth?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT)}&scope=${SCOPE}&response_type=token`;

async function main() {
  console.log("Opening browser (login if needed, then authorize)...");
  const browser = await chromium.launch({ headless: false });

  let context;
  try {
    context = await browser.newContext({ storageState: SESSION_PATH });
    console.log("Loaded saved session");
  } catch {
    context = await browser.newContext();
    console.log("No session — fresh browser");
  }

  const page = await context.newPage();
  await page.goto(OAUTH_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  console.log("Page loaded:", page.url().substring(0, 80));

  // Monitor URL changes for token
  console.log("\n⏳ Waiting for token (login + authorize if needed)...");
  console.log("   Browser will stay open for 5 minutes max.\n");

  let token = "";
  for (let i = 0; i < 150; i++) {
    try {
      const url = page.url();
      const hash = url.split("#")[1] || "";
      const params = new URLSearchParams(hash);
      const t = params.get("access_token");
      if (t) {
        token = t;
        break;
      }
    } catch {
      break;
    }
    await new Promise((r) => setTimeout(r, 2000));
  }

  if (token) {
    console.log(`✅ User Token (${token.length} chars): ${token.substring(0, 30)}...`);

    // Get page tokens
    const res = await fetch(
      `https://graph.facebook.com/v25.0/me/accounts?fields=name,id,access_token&access_token=${token}`
    );
    const data = (await res.json()) as any;
    if (data.data) {
      console.log("\n📄 Page Tokens:");
      for (const p of data.data) {
        console.log(`  ${p.name} (${p.id}) → ${p.access_token.length} chars`);
        console.log(`  TOKEN: ${p.access_token}`);
      }
    } else {
      console.log("No pages found:", JSON.stringify(data));
    }

    // Save session
    await context.storageState({ path: SESSION_PATH });
    console.log("\nSession saved.");
  } else {
    console.log("❌ No token captured.");
  }

  console.log("Closing in 3s...");
  await new Promise((r) => setTimeout(r, 3000));
  await browser.close();
}

main().catch(console.error);
