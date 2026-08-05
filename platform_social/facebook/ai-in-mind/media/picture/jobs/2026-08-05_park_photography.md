# JOB: AiM aim_morning 2026-08-05 — เดินถ่ายรูปดอกไม้สวนสาธารณะเช้าวันพุธ (photography)

**From:** Prism → Paradex
**Task:** gen 1 photo (full-body lifestyle photography) ตาม prompt

## REF (face reference — LEARN identity แล้ว generate ใหม่ ห้าม face-swap/paste)
- /home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/Picture_FluxAI/Ref_create_picture/w12 (20).png
- /home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/Picture_FluxAI/Ref_create_picture/w12 (23).png

## OUTPUT (temp + atomic rename)
/home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/media/picture/2026-08-05_park_photography.png

## เกณฑ์ผ่าน (Prism QC เอง)
1. หน้า = คนเดียวกับ ref ชัดๆ (ตา/คิ้ว/จมูก/ปาก/กรอบหน้า) — "คล้าย" ไม่พอ
2. มือ/นิ้ว/แขนปกติ (ถือกล้องต้องสมจริง ไม่บิดเบี้ยว นิ้วครบ)
3. framing ครบ ไม่ตัดมือ/ศอกกลางภาพ (full-body: head→feet)
4. ผิวสมจริง ไม่ AI-glossy · แสงเช้านุ่มธรรมชาติ ไม่ overexposed
5. สัดส่วนตัว วัด (เอว→เท้า)÷(ไหล่→เอว) = 1.7–2.3 (aiinmind-qc-measure-proportions)
6. โลเคชั่น = สวนสาธารณะทั่วไป (ไม่ใช่ย่านเก่ากรุงเทพ — ซ้ำกับ 06-30/07-03 แล้ว)
7. ตอบ FINAL + SHA256 · regen/ทับ = แจ้ง

## PROMPT (ใช้ทั้งบล็อกนี้)
```
Use the uploaded reference photos to LEARN this specific woman's facial identity — the exact eye shape and spacing, eyebrow arch, nose bridge and tip, lip shape, jawline and face oval. Then GENERATE her face fresh in the new scene's lighting and angle. The result must be instantly recognizable as the SAME woman as the references — a stranger comparing photos side-by-side must say "same person, different day". Do NOT face-swap or paste the reference face. Do NOT drift the identity: no slimmer face, no different nose, no changed eye shape.

Lifestyle photography, full-body portrait of a young Thai woman in her mid-20s, natural proportions (waist-to-feet roughly 1.7-2.3x shoulder-to-waist — no fashion-doll elongation).
Vertical 9:16, framed from head to feet, generous padding, no cropped limbs.

👗 FASHION: ivory linen button-down shirt tucked into light-wash straight-leg jeans, white canvas sneakers, tan leather crossbody camera bag. Hair down in loose soft waves.

💄 MAKEUP: fresh natural no-makeup look — dewy skin, light brows, soft rosy lips, healthy morning glow.

🧍 POSE: walking slowly through a public park early morning, holding a mirrorless camera up to her eye, framing a shot of flowers/greenery just out of frame, weight on one leg, candid unposed feel, gentle smile of concentration.

😊 EXPRESSION: focused but soft, quiet morning joy, absorbed in the moment.

💡 LIGHTING: soft warm early-morning sunlight filtering through trees, dappled natural shadows on the path, airy bright but NOT overexposed.

🏝️ BACKGROUND: lush public park in the morning — green lawn, blooming flower beds (not a specific old-town location), tall trees with soft bokeh, a paved walking path, morning mist lightly visible. Shallow depth of field.

🎥 CAMERA: 85mm lens, f/2.0, natural lighting, lifestyle editorial photography, ultra realistic, 8K, sharp focus, photorealistic skin texture.

Masterpiece, Ultra Photorealistic, 8K Ultra HD, RAW Photo, ultra detailed skin texture, realistic pores, natural facial details, realistic eyes, natural hair strands, cinematic shadows, shallow depth of field, realistic fabric texture, true-to-life colors, photorealistic human, natural imperfections, no CGI, no cartoon, no anime, no illustration, no plastic skin, no over-retouching, no artificial rendering.

🚫 NEGATIVE: low quality, blurry, out of focus, bad anatomy, malformed hands, extra fingers, extra arms, extra legs, duplicated limbs, asymmetrical eyes, crossed eyes, distorted face, deformed body, unrealistic proportions, elongated legs, stretched limbs, oversized head, fashion-doll proportions, plastic skin, cropped head, cut-off hands, floating jewelry, duplicate person, multiple people, watermark, text, logo, signature.
```
