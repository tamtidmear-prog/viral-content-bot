# JOB: AiM aim_afternoon 2026-08-10 — เดินธุระบ่ายวันจันทร์ในเมือง (city street OOTD)

**From:** Prism → Paradex
**Task:** gen 1 photo (full-body lifestyle) ตาม prompt

## REF (face reference — LEARN identity แล้ว generate ใหม่ ห้าม face-swap/paste)
- /home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/Picture_FluxAI/Ref_create_picture/w12 (23).png
- /home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/Picture_FluxAI/Ref_create_picture/w12 (24).png

## OUTPUT (temp + atomic rename)
/home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/media/picture/2026-08-10_afternoon_city_errand.png

## เกณฑ์ผ่าน (Prism QC เอง)
1. หน้า = คนเดียวกับ ref ชัดๆ (ตา/คิ้ว/จมูก/ปาก/กรอบหน้า) — "คล้าย" ไม่พอ
2. มือ/นิ้ว ปกติ (ถือกระเป๋า/โทรศัพท์ต้องสมจริง ไม่บิดเบี้ยว นิ้วครบ)
3. framing ครบ ไม่ตัดมือ/เท้ากลางภาพ (full-body: head→feet)
4. ผิวสมจริง ไม่ AI-glossy · แสงบ่ายนุ่มธรรมชาติ ไม่ overexposed
5. วัดสัดส่วน (เอว→เท้า)÷(ไหล่→เอว) = 1.7–2.3 ห้ามขายืด — **วัดด้วย grid overlay จริง ห้ามดูตาเปล่า**
6. ไม่มีตัวอักษรอ่านออกบนป้าย/ร้านค้าในพื้นหลัง
7. โลเคชั่น = ถนนย่านการค้ากลางเมืองตอนบ่าย (ไม่ใช่ตลาด/คาเฟ่/สวน/บ้านที่เคยทำ)
8. ตอบ FINAL + SHA256 · regen/ทับ = แจ้ง

## PROMPT (ใช้ทั้งบล็อกนี้)
```
Use the uploaded reference photos to LEARN this specific woman's facial identity — the exact eye shape and spacing, eyebrow arch, nose bridge and tip, lip shape, jawline and face oval. Then GENERATE her face fresh in the new scene's lighting and angle. The result must be instantly recognizable as the SAME woman as the references — a stranger comparing photos side-by-side must say "same person, different day". Do NOT face-swap or paste the reference face. Do NOT drift the identity: no slimmer face, no different nose, no changed eye shape.

Lifestyle photography, full-body portrait of a young Thai woman in her mid-20s, natural realistic proportions (waist-to-feet roughly 1.7-2.3x shoulder-to-waist — no fashion-doll elongation, no unnaturally long legs).
Vertical 9:16, framed from head to feet, generous padding, no cropped limbs.

👗 FASHION: ivory button-front blouse tucked into high-waisted wide-leg khaki trousers, tan leather belt, brown leather crossbody bag, white sneakers.

💄 MAKEUP: natural everyday makeup — light coverage, soft brown eyeshadow, nude-pink lips, subtle blush.

💇 HAIR: hair down straight with a light middle part, one hand casually tucking a strand behind her ear.

🧍 POSE: walking mid-stride along a city sidewalk, checking her phone briefly then looking up, relaxed confident posture, weight on one leg.

😊 EXPRESSION: calm, slightly focused, small natural smile like she's thinking about her afternoon errands.

💡 LIGHTING: soft overcast Monday-afternoon daylight, diffused, gentle shadows, natural skin tones, NOT overexposed.

🏝️ BACKGROUND: modern city street lined with shops, glass storefronts, a few blurred pedestrians, street trees in planters, clean pavement. Shallow depth of field.

🎥 CAMERA: 85mm lens, f/2.0, natural lighting, lifestyle editorial photography, ultra realistic, 8K, sharp focus, photorealistic skin texture.

Masterpiece, Ultra Photorealistic, 8K Ultra HD, RAW Photo, ultra detailed skin texture, realistic pores, natural facial details, realistic eyes, natural hair strands, cinematic shadows, shallow depth of field, realistic fabric texture, true-to-life colors, photorealistic human, natural imperfections, no CGI, no cartoon, no anime, no illustration, no plastic skin, no over-retouching, no artificial rendering.

🚫 NEGATIVE: low quality, blurry, out of focus, bad anatomy, malformed hands, extra fingers, extra arms, extra legs, duplicated limbs, asymmetrical eyes, crossed eyes, distorted face, deformed body, unrealistic proportions, elongated legs, stretched limbs, oversized head, fashion-doll proportions, plastic skin, cropped head, cut-off hands, cut-off feet, floating jewelry, missing jewelry, duplicate person, multiple people, watermark, text, logo, signature, readable text on signs or products.
```
