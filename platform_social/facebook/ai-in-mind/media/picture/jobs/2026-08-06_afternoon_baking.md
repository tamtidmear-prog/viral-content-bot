# JOB: AiM aim_afternoon 2026-08-06 — อบคุกกี้บ่ายวันพฤหัส (baking)

**From:** Prism → Paradex
**Task:** gen 1 photo (half-body lifestyle) ตาม prompt

## REF (face reference — LEARN identity แล้ว generate ใหม่ ห้าม face-swap/paste)
- /home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/Picture_FluxAI/Ref_create_picture/w12 (19).png
- /home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/Picture_FluxAI/Ref_create_picture/w12 (20).png

## OUTPUT (temp + atomic rename)
/home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/media/picture/2026-08-06_afternoon_baking.png

## เกณฑ์ผ่าน (Prism QC เอง)
1. หน้า = คนเดียวกับ ref ชัดๆ (ตา/คิ้ว/จมูก/ปาก/กรอบหน้า) — "คล้าย" ไม่พอ
2. มือ/นิ้ว ปกติ (กำลังปั้นแป้งคุกกี้ ต้องสมจริง ไม่บิดเบี้ยว นิ้วครบ)
3. framing ครบ ไม่ตัดมือ/ศอกกลางภาพ (half-body: head→upper thighs)
4. ผิวสมจริง ไม่ AI-glossy · แสงบ่ายอุ่นนุ่มธรรมชาติ ไม่ overexposed
5. ไม่มีตัวอักษรอ่านออกบนบรรจุภัณฑ์/วัตถุในฉาก
6. โลเคชั่น = ครัวบ้านทั่วไป (ไม่เคยทำ baking มาก่อน — ต่างจาก โจ๊ก 08-01/สลัด 07-01)
7. ตอบ FINAL + SHA256 · regen/ทับ = แจ้ง

## PROMPT (ใช้ทั้งบล็อกนี้)
```
Use the uploaded reference photos to LEARN this specific woman's facial identity — the exact eye shape and spacing, eyebrow arch, nose bridge and tip, lip shape, jawline and face oval. Then GENERATE her face fresh in the new scene's lighting and angle. The result must be instantly recognizable as the SAME woman as the references — a stranger comparing photos side-by-side must say "same person, different day". Do NOT face-swap or paste the reference face. Do NOT drift the identity: no slimmer face, no different nose, no changed eye shape.

Editorial lifestyle photography, half-body portrait of a young Thai woman in her mid-20s.
Vertical 9:16, framed from head to upper thighs.

👗 FASHION: mint-green linen apron over a white ribbed tank top, high-waisted cream linen shorts, sleeves pushed up, flour dust lightly on the apron front. Simple gold hoop earrings, hair tied back.

💄 MAKEUP: Minimal clean girl look — light foundation, natural brows, soft warm blush, clear lip gloss.

💇 HAIR: dark hair pulled back into a low messy bun, a few loose strands framing the face.

🧍 POSE: standing at a wooden kitchen counter, hands shaping cookie dough into small rounds on a baking tray, looking down at her hands with a soft focused smile.

😊 EXPRESSION: relaxed, content, quietly focused on the task, soft smile.

💡 LIGHTING: warm late-afternoon light through a kitchen window to the side, soft diffused golden tone.

🏝️ BACKGROUND: cozy home kitchen counter — wooden cutting board, a bowl of cookie dough, a tray of unbaked cookie rounds, a small jar of chocolate chips, a dusting of flour on the counter, a potted herb plant on the windowsill, soft blurred cabinets behind.

🎥 CAMERA: 85mm lens, f/2.0, natural lighting, editorial lifestyle photography style, ultra realistic, 8K, sharp focus, photorealistic skin texture.

Masterpiece, Ultra Photorealistic, 8K Ultra HD, RAW Photo, ultra detailed skin texture, realistic pores, natural facial details, realistic eyes, natural hair strands, cinematic shadows, shallow depth of field, realistic fabric texture, true-to-life colors, photorealistic human, natural imperfections, no CGI, no cartoon, no anime, no illustration, no plastic skin, no over-retouching, no artificial rendering.

🚫 NEGATIVE: low quality, blurry, out of focus, bad anatomy, malformed hands, extra fingers, extra arms, extra legs, duplicated limbs, asymmetrical eyes, crossed eyes, distorted face, deformed body, unrealistic proportions, elongated legs, stretched limbs, oversized head, fashion-doll proportions, plastic skin, cropped head, cut-off hands, cut-off feet, floating jewelry, missing jewelry, duplicate person, multiple people, watermark, text, logo, signature, readable text on packaging or objects.
```
