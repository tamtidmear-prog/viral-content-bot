# JOB: AiM aim_morning 2026-08-04 — ยืดเส้นเช้าริมหน้าต่าง (wellness)

**From:** Prism → Paradex
**Task:** gen 1 photo (half-body lifestyle wellness) ตาม prompt

## REF (face reference — LEARN identity แล้ว generate ใหม่ ห้าม face-swap/paste)
- /home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/Picture_FluxAI/Ref_create_picture/w12 (20).png
- /home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/Picture_FluxAI/Ref_create_picture/w12 (53).png

## OUTPUT (temp + atomic rename)
/home/jijiclaw/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/media/picture/2026-08-04_morning_stretch.png

## เกณฑ์ผ่าน (Prism QC เอง)
1. หน้า = คนเดียวกับ ref ชัดๆ (ตา/คิ้ว/จมูก/ปาก/กรอบหน้า) — "คล้าย" ไม่พอ
2. มือ/นิ้ว/แขนปกติ (ท่ายืดแขนต้องสมจริง ไม่บิดเบี้ยว)
3. framing ครบ ไม่ตัดมือ/ศอกกลางภาพ (half-body: head→upper thigh)
4. ผิวสมจริง ไม่ AI-glossy · แสงเช้านุ่มธรรมชาติ ไม่ overexposed
5. หัวสัดส่วนธรรมชาติ ไม่โต (natural, ไม่ over-fix)
6. ตอบ FINAL + SHA256 · regen/ทับ = แจ้ง

## PROMPT (ใช้ทั้งบล็อกนี้)
```
Use the uploaded reference photos to LEARN this specific woman's facial identity — the exact eye shape and spacing, eyebrow arch, nose bridge and tip, lip shape, jawline and face oval. Then GENERATE her face fresh in the new scene's lighting and angle. The result must be instantly recognizable as the SAME woman as the references — a stranger comparing photos side-by-side must say "same person, different day". Do NOT face-swap or paste the reference face. Do NOT drift the identity: no slimmer face, no different nose, no changed eye shape.

Lifestyle wellness photography, half-body portrait of a young Thai woman in her mid-20s.
Vertical 9:16, framed from head to upper thighs.

👗 FASHION: soft coral ribbed athleisure set — fitted tank top and matching high-waisted leggings, clean minimal sporty look. Hair tied in a neat high ponytail.

💄 MAKEUP: fresh natural no-makeup look — dewy skin, light brows, soft rosy lips, healthy morning glow.

🧍 POSE: standing by a large window doing a gentle morning stretch — both arms raised and gently reaching upward, torso lengthened, relaxed, eyes softly closed or gazing out the window, calm and refreshed.

😊 EXPRESSION: serene content morning mood, relaxed, a soft gentle smile.

💡 LIGHTING: soft warm early-morning sunlight streaming through the window from the side, gentle and diffused, natural soft shadows, airy bright but NOT overexposed.

🏝️ BACKGROUND: bright airy home interior by a large window — sheer curtains softly glowing, a monstera plant, light wood floor, minimal cozy morning atmosphere. Shallow depth of field.

🎥 CAMERA: 85mm lens, f/2.0, natural lighting, lifestyle editorial photography, ultra realistic, 8K, sharp focus, photorealistic skin texture.

Masterpiece, Ultra Photorealistic, 8K Ultra HD, RAW Photo, ultra detailed skin texture, realistic pores, natural facial details, realistic eyes, natural hair strands, cinematic shadows, shallow depth of field, realistic fabric texture, true-to-life colors, photorealistic human, natural imperfections, no CGI, no cartoon, no anime, no illustration, no plastic skin, no over-retouching, no artificial rendering.

🚫 NEGATIVE: low quality, blurry, out of focus, bad anatomy, malformed hands, extra fingers, extra arms, extra legs, duplicated limbs, asymmetrical eyes, crossed eyes, distorted face, deformed body, unrealistic proportions, elongated legs, stretched limbs, oversized head, fashion-doll proportions, plastic skin, cropped head, cut-off hands, floating jewelry, duplicate person, multiple people, watermark, text, logo, signature.
```
