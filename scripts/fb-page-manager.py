#!/usr/bin/env python3
"""
fb-page-manager.py — เครื่องมือจัดการ Facebook Page ผ่าน browser automation
ใช้ Chrome session ที่ login ไว้แล้ว (ไม่ต้อง login ใหม่)

Usage:
  ./fb-page-manager.py set-profile <image-path>
  ./fb-page-manager.py set-cover <image-path>
  ./fb-page-manager.py set-both <profile-path> <cover-path>
  ./fb-page-manager.py screenshot
  ./fb-page-manager.py token-gen [--permissions p1,p2,...]

Page ID อ่านจาก config/platforms.json อัตโนมัติ
"""

import sys
import os
import json
import time
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
CONFIG_DIR = SCRIPT_DIR.parent / "config"
CHROME_PROFILE = Path.home() / ".config/google-chrome/Default"
SCREENSHOTS_DIR = Path("/tmp/fb-page-manager")

def load_page_id():
    config = json.loads((CONFIG_DIR / "platforms.json").read_text())
    return config["facebook"]["page_id"]

def ensure_dirs():
    SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)

def get_browser(headless=False):
    from playwright.sync_api import sync_playwright
    pw = sync_playwright().start()
    browser = pw.chromium.launch_persistent_context(
        str(CHROME_PROFILE),
        headless=headless,
        channel="chrome",
        slow_mo=300,
        args=["--disable-blink-features=AutomationControlled"],
    )
    return pw, browser

def check_logged_in(page):
    page.goto("https://www.facebook.com/", wait_until="domcontentloaded")
    page.wait_for_timeout(3000)
    if "login" in page.url or page.query_selector('input[name="email"]'):
        print("❌ Facebook session expired — login ที่ Chrome ก่อน")
        return False
    print("✅ Facebook session active")
    return True

def screenshot_page(page, name):
    path = SCREENSHOTS_DIR / f"{name}.png"
    page.screenshot(path=str(path))
    print(f"  📸 {path}")
    return path

def try_click(page, selectors, label="element"):
    for sel in selectors:
        el = page.query_selector(sel)
        if el:
            el.click()
            print(f"  ✅ Clicked {label}: {sel}")
            return True
    return False

def upload_file(page, file_path):
    """Try to upload file via filechooser or input[type=file]"""
    # First try: look for input[type=file] that accepts images
    file_inputs = page.query_selector_all('input[type="file"]')
    for fi in file_inputs:
        accept = fi.get_attribute("accept") or ""
        if "image" in accept or not accept:
            fi.set_input_files(str(file_path))
            print(f"  ✅ File uploaded: {Path(file_path).name}")
            return True

    print(f"  ❌ No file input found")
    return False

def set_profile_pic(page, image_path, page_id):
    print("\n=== Setting Profile Picture ===")
    page_url = f"https://www.facebook.com/profile.php?id={page_id}"
    page.goto(page_url, wait_until="domcontentloaded")
    page.wait_for_timeout(5000)
    screenshot_page(page, "01-page-loaded")

    # Step 1: Click profile pic edit
    profile_selectors = [
        '[aria-label="Edit profile picture"]',
        '[aria-label="แก้ไขรูปโปรไฟล์"]',
        '[aria-label="Update profile picture"]',
        '[aria-label="อัปเดตรูปโปรไฟล์"]',
    ]

    if not try_click(page, profile_selectors, "profile edit"):
        # Try: hover profile area first, then find the button
        profile_area = page.query_selector('[data-imgperflogname="profileCoverPhoto"]')
        if profile_area:
            profile_area.hover()
            page.wait_for_timeout(1000)
            if not try_click(page, profile_selectors, "profile edit (after hover)"):
                screenshot_page(page, "01b-no-profile-edit")
                print("  ❌ Cannot find profile edit button")
                return False
        else:
            screenshot_page(page, "01b-no-profile-area")
            print("  ❌ Cannot find profile picture area")
            return False

    page.wait_for_timeout(2000)
    screenshot_page(page, "02-profile-menu")

    # Step 2: Click Upload Photo
    upload_selectors = [
        'text="Upload photo"',
        'text="Upload Photo"',
        'text="อัปโหลดรูปภาพ"',
        'text="อัพโหลดรูปภาพ"',
        '[role="menuitem"] >> text="Upload"',
        '[role="menuitem"] >> text="อัปโหลด"',
    ]

    # Use filechooser pattern
    clicked_upload = False
    for sel in upload_selectors:
        el = page.query_selector(sel)
        if el:
            with page.expect_file_chooser(timeout=5000) as fc_info:
                el.click()
            file_chooser = fc_info.value
            file_chooser.set_files(str(image_path))
            clicked_upload = True
            print(f"  ✅ Profile pic selected: {Path(image_path).name}")
            break

    if not clicked_upload:
        screenshot_page(page, "02b-no-upload")
        # Fallback: try input[type=file]
        if not upload_file(page, image_path):
            print("  ❌ Cannot upload profile picture")
            return False

    page.wait_for_timeout(5000)
    screenshot_page(page, "03-profile-preview")

    # Step 3: Save
    save_selectors = [
        'div[role="button"] >> text="Save"',
        'div[role="button"] >> text="บันทึก"',
        '[aria-label="Save"]',
        '[aria-label="บันทึก"]',
        'text="Save"',
        'text="บันทึก"',
    ]

    if try_click(page, save_selectors, "save"):
        page.wait_for_timeout(8000)
        screenshot_page(page, "04-profile-done")
        print("  ✅ Profile picture saved!")
        return True

    screenshot_page(page, "03b-no-save")
    print("  ⚠️ Save button not found — check screenshot")
    return False

def set_cover_photo(page, image_path, page_id):
    print("\n=== Setting Cover Photo ===")
    page_url = f"https://www.facebook.com/profile.php?id={page_id}"
    page.goto(page_url, wait_until="domcontentloaded")
    page.wait_for_timeout(5000)

    # Step 1: Click cover edit
    cover_selectors = [
        'text="Edit cover photo"',
        'text="แก้ไขรูปปก"',
        'text="Add cover photo"',
        'text="เพิ่มรูปปก"',
        '[aria-label="Edit cover photo"]',
        '[aria-label="แก้ไขรูปปก"]',
        '[aria-label="Add Cover Photo"]',
        '[aria-label="เพิ่มรูปปก"]',
    ]

    if not try_click(page, cover_selectors, "cover edit"):
        screenshot_page(page, "10-no-cover-edit")
        print("  ❌ Cannot find cover edit button")
        return False

    page.wait_for_timeout(2000)
    screenshot_page(page, "11-cover-menu")

    # Step 2: Upload
    upload_selectors = [
        'text="Upload photo"',
        'text="Upload Photo"',
        'text="อัปโหลดรูปภาพ"',
        '[role="menuitem"] >> text="Upload"',
        '[role="menuitem"] >> text="อัปโหลด"',
    ]

    clicked_upload = False
    for sel in upload_selectors:
        el = page.query_selector(sel)
        if el:
            try:
                with page.expect_file_chooser(timeout=5000) as fc_info:
                    el.click()
                file_chooser = fc_info.value
                file_chooser.set_files(str(image_path))
                clicked_upload = True
                print(f"  ✅ Cover photo selected: {Path(image_path).name}")
            except:
                pass
            break

    if not clicked_upload:
        if not upload_file(page, image_path):
            screenshot_page(page, "11b-no-upload")
            print("  ❌ Cannot upload cover photo")
            return False

    page.wait_for_timeout(5000)
    screenshot_page(page, "12-cover-preview")

    # Step 3: Save
    save_selectors = [
        'div[role="button"] >> text="Save changes"',
        'div[role="button"] >> text="บันทึกการเปลี่ยนแปลง"',
        'div[role="button"] >> text="Save"',
        'div[role="button"] >> text="บันทึก"',
        'text="Save changes"',
        'text="Save"',
        'text="บันทึก"',
    ]

    if try_click(page, save_selectors, "save"):
        page.wait_for_timeout(8000)
        screenshot_page(page, "13-cover-done")
        print("  ✅ Cover photo saved!")
        return True

    screenshot_page(page, "12b-no-save")
    print("  ⚠️ Save button not found — check screenshot")
    return False

def cmd_screenshot():
    """ถ่ายภาพหน้า page ปัจจุบัน"""
    page_id = load_page_id()
    ensure_dirs()
    pw, browser = get_browser()
    page = browser.new_page()

    if not check_logged_in(page):
        browser.close(); pw.stop(); return

    page.goto(f"https://www.facebook.com/profile.php?id={page_id}", wait_until="domcontentloaded")
    page.wait_for_timeout(5000)
    path = screenshot_page(page, "page-current")
    print(f"\n✅ Screenshot saved: {path}")

    browser.close()
    pw.stop()

def cmd_token_gen(permissions=None):
    """ไป Graph API Explorer เพิ่ม permission แล้ว generate token"""
    if not permissions:
        permissions = ["pages_manage_metadata", "pages_manage_posts", "pages_read_engagement", "pages_show_list"]

    ensure_dirs()
    pw, browser = get_browser()
    page = browser.new_page()

    if not check_logged_in(page):
        browser.close(); pw.stop(); return

    print(f"\n📋 Opening Graph API Explorer...")
    print(f"   Permissions needed: {', '.join(permissions)}")
    page.goto("https://developers.facebook.com/tools/explorer/", wait_until="domcontentloaded")
    page.wait_for_timeout(5000)
    screenshot_page(page, "token-explorer")

    print("\n⚠️  Manual steps needed in browser:")
    print("  1. Select App: Mamipogo")
    print(f"  2. Add permissions: {', '.join(permissions)}")
    print("  3. Click 'Generate Access Token'")
    print("  4. Authorize in popup")
    print("\nWaiting 120s for manual completion...")

    # Wait for user to complete
    time.sleep(120)
    screenshot_page(page, "token-done")

    browser.close()
    pw.stop()

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    cmd = sys.argv[1]
    page_id = load_page_id()
    ensure_dirs()

    if cmd == "screenshot":
        cmd_screenshot()
        return

    if cmd == "token-gen":
        perms = sys.argv[2].split(",") if len(sys.argv) > 2 else None
        cmd_token_gen(perms)
        return

    if cmd == "set-profile":
        if len(sys.argv) < 3:
            print("Usage: fb-page-manager.py set-profile <image-path>")
            sys.exit(1)
        image_path = Path(sys.argv[2]).resolve()
        if not image_path.exists():
            print(f"❌ File not found: {image_path}")
            sys.exit(1)

        pw, browser = get_browser()
        page = browser.new_page()
        if not check_logged_in(page):
            browser.close(); pw.stop(); return
        result = set_profile_pic(page, image_path, page_id)
        browser.close(); pw.stop()
        sys.exit(0 if result else 1)

    elif cmd == "set-cover":
        if len(sys.argv) < 3:
            print("Usage: fb-page-manager.py set-cover <image-path>")
            sys.exit(1)
        image_path = Path(sys.argv[2]).resolve()
        if not image_path.exists():
            print(f"❌ File not found: {image_path}")
            sys.exit(1)

        pw, browser = get_browser()
        page = browser.new_page()
        if not check_logged_in(page):
            browser.close(); pw.stop(); return
        result = set_cover_photo(page, image_path, page_id)
        browser.close(); pw.stop()
        sys.exit(0 if result else 1)

    elif cmd == "set-both":
        if len(sys.argv) < 4:
            print("Usage: fb-page-manager.py set-both <profile-path> <cover-path>")
            sys.exit(1)
        profile_path = Path(sys.argv[2]).resolve()
        cover_path = Path(sys.argv[3]).resolve()

        for p in [profile_path, cover_path]:
            if not p.exists():
                print(f"❌ File not found: {p}")
                sys.exit(1)

        pw, browser = get_browser()
        page = browser.new_page()
        if not check_logged_in(page):
            browser.close(); pw.stop(); return

        r1 = set_profile_pic(page, profile_path, page_id)
        r2 = set_cover_photo(page, cover_path, page_id)

        print(f"\n=== RESULTS ===")
        print(f"Profile Pic: {'✅' if r1 else '❌'}")
        print(f"Cover Photo: {'✅' if r2 else '❌'}")

        browser.close(); pw.stop()
        sys.exit(0 if r1 and r2 else 1)

    else:
        print(f"❌ Unknown command: {cmd}")
        print(__doc__)
        sys.exit(1)

if __name__ == "__main__":
    main()
