#!/usr/bin/env python3
"""
check-comments.py — ตรวจและตอบ comment อัตโนมัติสำหรับทุกเพจที่ Prism ดูแล
- Ai_In_Mind: auto-reply เสียงสวีท (หญิง 26 lifestyle)
- Prism Chronicle: log + notify Nexus (รอ manual approve)

Run: python3 check-comments.py
Cron: ทุก 30 นาที
"""

import json, os, sys, subprocess, requests, datetime

# --- config ---
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.join(SCRIPT_DIR, "..", "..")  # viral-content-bot/
PLATFORMS_JSON = os.path.join(ROOT_DIR, "config", "platforms.json")
STATE_FILE = os.path.join(SCRIPT_DIR, "comment-state.json")
PRISM_ERA_CUTOFF = "2026-05-26"  # Prism เริ่มควบคุมเพจ

# --- load tokens ---
with open(PLATFORMS_JSON) as f:
    PLATFORMS = json.load(f)["facebook"]["pages"]

PAGES = {
    "ai_in_mind": {
        "id": PLATFORMS["ai_in_mind"]["id"],
        "token": PLATFORMS["ai_in_mind"]["access_token"],
        "mode": "auto_reply",
        "persona": (
            "คุณคือสวีท ผู้หญิงไทยอายุ 26 ที่ดูแลเพจ Ai_In_Mind "
            "นิสัยอารมณ์ดี น่ารัก เป็นกันเอง ชอบท่องเที่ยว ถ่ายรูป ออกกำลังกาย แฟชั่น "
            "ตอบ comment สั้นๆ เป็นกันเอง ภาษาไทย ลงท้ายด้วย ค่ะ/นะคะ "
            "ใส่ emoji น่ารักๆ 1-2 ตัว ห้ามพูดถึง AI ห้ามเอ่ยชื่อ Master J "
            "ตอบ 1-2 ประโยค ไม่ยาว ไม่ formal"
        ),
    },
    "prism_chronicle": {
        "id": PLATFORMS["prism_chronicle"]["id"],
        "token": PLATFORMS["prism_chronicle"]["access_token"],
        "mode": "notify_only",  # log + notify Nexus ไม่ auto-reply
        "persona": None,
    },
}

# --- load / save state ---
def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE) as f:
            return json.load(f)
    return {"replied": [], "notified": []}

def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)

# --- FB API ---
def fb_get(path, token, params=None):
    p = {"access_token": token, **(params or {})}
    r = requests.get(f"https://graph.facebook.com/v25.0/{path}", params=p, timeout=15)
    return r.json()

def fb_post_comment(comment_id, token, message):
    r = requests.post(
        f"https://graph.facebook.com/v25.0/{comment_id}/comments",
        data={"message": message, "access_token": token},
        timeout=15,
    )
    return r.json()

# --- Groq reply generation ---
def generate_reply(comment_msg, post_caption, persona):
    try:
        groq_key = subprocess.check_output(["pass", "nexus/groq_api_key"], text=True).strip()
    except Exception as e:
        print(f"  [ERROR] pass groq_api_key: {e}")
        return None

    prompt = (
        f"{persona}\n\n"
        f"โพสของเรา: {post_caption[:200]}\n"
        f"comment ที่ได้รับ: {comment_msg}\n\n"
        f"ตอบ comment นี้:"
    )
    try:
        r = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {groq_key}", "Content-Type": "application/json"},
            json={
                "model": "llama-3.3-70b-versatile",
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 100,
                "temperature": 0.7,
            },
            timeout=20,
        )
        return r.json()["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"  [ERROR] Groq: {e}")
        return None

# --- notify Nexus ---
def notify_nexus(page_name, post_id, comment_id, commenter, message):
    payload = {
        "target": "nexus",
        "text": (
            f"[prism→nexus] 💬 comment ใหม่บน {page_name} รอ approve\n"
            f"post: {post_id}\n"
            f"จาก: {commenter}\n"
            f"ข้อความ: {message}\n"
            f"comment_id: {comment_id}"
        ),
    }
    try:
        requests.post("http://localhost:3456/api/send", json=payload, timeout=5)
    except Exception:
        pass

# --- main ---
def check_page(page_key, page_cfg, state):
    page_id = page_cfg["id"]
    token = page_cfg["token"]
    mode = page_cfg["mode"]
    persona = page_cfg["persona"]
    new_actions = []

    print(f"\n[{page_key}] checking posts since {PRISM_ERA_CUTOFF}...")

    # fetch posts
    posts_data = fb_get(f"{page_id}/posts", token, {
        "fields": "id,message,created_time",
        "limit": 50,
        "since": PRISM_ERA_CUTOFF,
    })
    posts = posts_data.get("data", [])
    print(f"  {len(posts)} posts found")

    for post in posts:
        post_id = post["id"]
        post_caption = post.get("message", "")

        # fetch comments
        comments_data = fb_get(f"{post_id}/comments", token, {
            "fields": "id,message,from,created_time",
            "limit": 100,
        })
        comments = comments_data.get("data", [])
        if not comments:
            continue

        for comment in comments:
            cid = comment["id"]
            cmsg = comment.get("message", "")
            cname = comment.get("from", {}).get("name", "unknown")
            cfrom_id = comment.get("from", {}).get("id", "")

            # skip: own page comments
            if cfrom_id == page_id:
                continue

            # skip: already handled
            if cid in state["replied"] or cid in state["notified"]:
                continue

            # skip: empty message
            if not cmsg.strip():
                state["replied"].append(cid)
                continue

            print(f"  NEW comment [{cid}] from {cname}: {cmsg[:60]}")

            if mode == "auto_reply":
                reply = generate_reply(cmsg, post_caption, persona)
                if reply:
                    result = fb_post_comment(cid, token, reply)
                    if "id" in result:
                        print(f"  → replied: {reply[:60]}")
                        state["replied"].append(cid)
                        new_actions.append(f"replied {cid} ({cname}): {reply[:40]}")
                    else:
                        print(f"  → reply FAILED: {result}")
                else:
                    print(f"  → reply generation failed, skipping")

            elif mode == "notify_only":
                notify_nexus(page_key, post_id, cid, cname, cmsg)
                state["notified"].append(cid)
                new_actions.append(f"notified {cid} ({cname}): {cmsg[:40]}")
                print(f"  → notified Nexus")

    return new_actions

def main():
    state = load_state()
    all_actions = []

    for page_key, page_cfg in PAGES.items():
        actions = check_page(page_key, page_cfg, state)
        all_actions.extend(actions)

    save_state(state)

    # log summary
    if all_actions:
        log_path = os.path.join(
            SCRIPT_DIR, "ai-in-mind", "logs",
            f"{datetime.date.today()}_daily.md"
        )
        with open(log_path, "a") as f:
            ts = datetime.datetime.now().strftime("%H:%M")
            f.write(f"\n## {ts} — comment check\n")
            for a in all_actions:
                f.write(f"- {a}\n")
        print(f"\n[LOG] {len(all_actions)} actions logged to {log_path}")
    else:
        print("\n[OK] no new comments")

if __name__ == "__main__":
    main()
