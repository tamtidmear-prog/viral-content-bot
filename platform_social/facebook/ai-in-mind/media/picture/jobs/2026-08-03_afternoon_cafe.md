# JOB: AiM aim_afternoon 2026-08-03 — คาเฟ่ อ่านหนังสือ บ่ายวันจันทร์

**From:** Prism → Paradex
**Task:** gen 1 photo (half-body lifestyle) ตาม prompt ด้านล่าง

## REF (face reference — LEARN identity แล้ว generate ใหม่ ห้าม face-swap/paste)
- /home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/Picture_FluxAI/Ref_create_picture/w12 (19).png
- /home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/Picture_FluxAI/Ref_create_picture/w12 (23).png

## OUTPUT (temp + atomic rename)
/home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/media/picture/2026-08-03_afternoon_cafe.png

## เกณฑ์ผ่าน (Prism จะ QC เอง — ทำให้ผ่านก่อนส่ง FINAL)
1. หน้า = คนเดียวกับ ref ชัดๆ (ตา/คิ้ว/จมูก/ปาก/กรอบหน้า) — "คล้าย" ไม่พอ
2. มือ/นิ้วปกติ ไม่เกิน ไม่ขาด (มือถือหนังสือต้องสมจริง)
3. framing ครบ ไม่ตัดแขน/มือ/หนังสือกลางภาพ (half-body: head→upper thighs)
4. ผิวสมจริง ไม่ AI-glossy/พลาสติก · แสงบ่ายอุ่นธรรมชาติ ไม่ overexposed
5. หัวสัดส่วนธรรมชาติ ไม่โต (natural, ไม่ over-fix)
6. ตอบ FINAL พร้อม SHA256 · ถ้า regen/ทับ = แจ้ง

## PROMPT (ใช้ทั้งบล็อกนี้)
```
Use the uploaded reference photos to LEARN this specific woman's facial identity — the exact eye shape and spacing, eyebrow arch, nose bridge and tip, lip shape, jawline and face oval. Then GENERATE her face fresh in the new scene's lighting and angle. The result must be instantly recognizable as the SAME woman as the references — a stranger comparing photos side-by-side must say "same person, different day". Do NOT face-swap or paste the reference face. Do NOT drift the identity: no slimmer face, no different nose, no changed eye shape.

Editorial lifestyle photography, half-body portrait of a young Thai woman in her mid-20s.
Vertical 9:16, framed from head to upper thighs.

👗 FASHION: caramel/camel oversized ribbed knit cardigan worn open over a fitted white ribbed tank top, high-waisted cream straight trousers. Accessories: delicate thin gold necklace, small gold hoop earrings.

💄 MAKEUP: Minimal clean girl look — light foundation, natural brows, soft peach blush, clear lip gloss.

💇 HAIR: long dark hair in loose soft waves, half-up loosely clipped, a few front strands framing the face.

🧍 POSE: seated at a wooden café table, holding an open paperback book in one hand, the other hand resting gently beside a latte cup, eyes lowered toward the page, shoulders relaxed.

😊 EXPRESSION: soft calm smile, relaxed and content, gaze lowered to the book.

💡 LIGHTING: warm afternoon sunlight through a large café window from the left side, soft and diffused, gentle golden tone, natural soft shadows.

🏝️ BACKGROUND: cozy specialty café interior — warm wood table, warm neutral wall with a small potted plant, wooden shelves with books and coffee gear softly blurred, a ceramic latte cup with subtle latte art on the table beside an open notebook. Window with warm afternoon light. Shallow depth of field.

🎥 CAMERA: 85mm lens, f/2.0, natural lighting, editorial lifestyle photography style, ultra realistic, 8K, sharp focus, photorealistic skin texture.

Masterpiece, Ultra Photorealistic, 8K Ultra HD, RAW Photo, ultra detailed skin texture, realistic pores, natural facial details, realistic eyes, natural hair strands, cinematic shadows, shallow depth of field, realistic fabric texture, true-to-life colors, photorealistic human, natural imperfections, no CGI, no cartoon, no anime, no illustration, no plastic skin, no over-retouching, no artificial rendering.

🚫 NEGATIVE: low quality, blurry, out of focus, bad anatomy, malformed hands, extra fingers, extra arms, extra legs, duplicated limbs, asymmetrical eyes, crossed eyes, distorted face, deformed body, unrealistic proportions, elongated legs, stretched limbs, oversized head, fashion-doll proportions, plastic skin, cropped head, cut-off hands, cut-off feet, floating jewelry, missing jewelry, duplicate person, multiple people, watermark, text, logo, signature.
```
