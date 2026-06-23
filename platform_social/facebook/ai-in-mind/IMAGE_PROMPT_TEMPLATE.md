# Ai_In_Mind — Image Prompt Template v6

> ใช้ template นี้ทุกครั้งที่สร้างรูปผ่าน ChatGPT Images pipeline
> v6: 3 modes (close-up / half-body / full-body) + skin detail + negative prompt + section headers
> Learnings จาก Master J prompts 23 มิ.ย. 2026

---

## 3 Modes — เลือกตาม framing

| Mode | Framing | Aperture | ใช้เมื่อ |
|------|---------|----------|---------|
| **CLOSE-UP** | head to upper chest | f/1.4 | beauty portrait, skincare, อารมณ์ |
| **HALF-BODY** | head to upper thighs | f/2.0 | street style, OOTD, casual |
| **FULL-BODY** | head to feet | f/2.8 | lifestyle, activity, scene เยอะ |

---

## FACE REF LINE (บังคับ — ใส่บนสุดทุก prompt)

```
Use the uploaded photos as face reference — the generated person must be clearly recognizable as the same individual, but do NOT copy-paste the face directly. Instead, recreate the face naturally so it looks like the same person photographed on a different day with different lighting. Natural facial variations are expected and desired.
```

---

## MODE 1: CLOSE-UP PORTRAIT (f/1.4)

```
[FACE REF LINE]

Fine-Art Beauty Photography close-up portrait of a young Thai woman in her mid-20s.
Vertical 9:16, cropped from head to upper chest, focus on face, neck, collarbones.

🔒 SKIN: Porcelain fair pinkish-white skin, translucent glass skin glow while maintaining realistic skin texture. Subtle highlights on nose bridge, cheekbones, and lips. Soft diffused pink blush spread across both cheeks adding freshness.

💄 MAKEUP: [STYLE — e.g. Korean peach-tone / minimal clean girl / soft glam]. Glossy lips in natural pink rose petal color, coated with clear lip gloss for juicy glossy shine, softly reflecting light. Lips slightly parted. Curled natural lashes.

💇 HAIR: [STYLE — e.g. long dark hair, soft waves / short bob]. Front strands naturally blown across face by gentle wind, some crossing over cheeks — adding movement and romantic feeling.

👗 OUTFIT: [ITEM — e.g. delicate ivory cream thin-strap camisole with lace trim].

🧍 POSE: [SPECIFIC — e.g. one arm raised above head, creating neck and shoulder lines / chin resting on hand].

😊 EXPRESSION: [SPECIFIC — e.g. calm gentle gaze at camera, slightly mysterious / warm smile with eyes slightly squinted].

💡 LIGHTING: Soft natural window light from [DIRECTION — left/right] side, softly diffused across face and skin, no hard shadows. Warm [TONE — cream/golden/cool] tone light.

🏝️ BACKGROUND: [SIMPLE — e.g. cream white softly blurred / bedroom with morning light]. Shallow depth of field, no distractions.

🎥 CAMERA: 85mm portrait lens, f/1.4, ultra shallow depth of field, creamy bokeh, HDR, ultra-detailed eyes, glossy lips, cinematic color grading, Korean Beauty Editorial, Luxury Skincare Advertisement, Fine Art Beauty Shot, photorealistic, 8K resolution.

[NEGATIVE PROMPT]
```

---

## MODE 2: HALF-BODY STREET (f/2.0)

```
[FACE REF LINE]

Editorial street photography, half-body portrait of a young Thai woman in her mid-20s.
Vertical 9:16, framed from head to upper thighs.

👗 FASHION: [SPECIFIC — e.g. oversized vintage band t-shirt tucked into high-waisted denim shorts / white crop top + red cargo pants]. [ACCESSORIES — e.g. simple gold necklace, brown bucket bag with gold chain strap].

💄 MAKEUP: Minimal clean girl look — light foundation, natural brows, soft brown eyeshadow, clear lip gloss.

💇 HAIR: [STYLE — e.g. long straight dark hair with curtain bangs / ponytail].

🧍 POSE: [SPECIFIC — e.g. leaning against concrete wall, one hand in pocket / standing at canal pier, shoulder carrying bag].

😊 EXPRESSION: [SPECIFIC — e.g. confident slight smile, looking directly at camera / calm neutral, eyes focused to the side].

💡 LIGHTING: [SPECIFIC — e.g. warm afternoon sunlight casting geometric shadows / soft overcast diffused light].

🏝️ BACKGROUND: [SPECIFIC — e.g. urban alley with visible concrete texture / Asok canal pier, Bodhi tree, white barrier wall].

🎥 CAMERA: 85mm lens, f/2.0, natural lighting, editorial street photography style, ultra realistic, 8K, sharp focus, photorealistic skin texture.

[NEGATIVE PROMPT]
```

---

## MODE 3: FULL-BODY LIFESTYLE (f/2.8)

```
[FACE REF LINE]

Lifestyle fashion editorial photography, full-body portrait of a young Thai woman in her mid-20s.
Vertical 9:16, full body visible from head to feet, ALL LIMBS VISIBLE IN FRAME.

👗 FASHION: [SPECIFIC with construction detail — e.g. white linen blouse tucked into high-waisted beige wide-leg pants, relaxed fit / sage green sport bra + high-waisted matching leggings]. [ACCESSORIES]. [FOOTWEAR].

💄 MAKEUP: [STYLE].

💇 HAIR: [STYLE + interaction — e.g. hair catching morning breeze / tied in high ponytail].

🧍 POSE: [SPECIFIC — e.g. mid-stride walking, looking slightly to side / warrior II yoga pose on mat].

😊 EXPRESSION: [SPECIFIC — e.g. natural smile, relaxed happy mood / focused and serene].

💡 LIGHTING: [DIRECTION + QUALITY + TONE — e.g. morning golden hour from the side, warm natural / afternoon sunlight through windows, soft diffused].

🏝️ BACKGROUND: [DETAILED — e.g. charming Bangkok side street with yellow awning, flowers, colorful shophouses / modern minimalist living room with monstera, large windows].

CRITICAL PROPORTION RULE: Head must be 1/8 of total visible height. Strict 1:7.5 head-to-body ratio. NOT stylized, NOT doll-like. If in doubt, make head slightly smaller.

🎥 CAMERA: 85mm lens, f/2.8, sharp focus throughout, natural lighting, lifestyle fashion editorial, commercial campaign quality, ultra realistic, 8K, true-to-life skin texture and hair detail.

[NEGATIVE PROMPT]
```

---

## QUALITY BLOCK (ใส่ท้ายทุก mode)

```
Masterpiece, Ultra Photorealistic, 8K Ultra HD, RAW Photo, ultra detailed skin texture, realistic pores, natural facial details, realistic eyes, natural hair strands, cinematic shadows, shallow depth of field, realistic fabric texture, true-to-life colors, photorealistic human, natural imperfections, no CGI, no cartoon, no anime, no illustration, no plastic skin, no over-retouching, no artificial rendering.
```

---

## NEGATIVE PROMPT (ใหม่ v6 — ใส่ท้ายทุก prompt)

```
🚫 NEGATIVE: low quality, blurry, out of focus, bad anatomy, malformed hands, extra fingers, extra arms, extra legs, duplicated limbs, asymmetrical eyes, crossed eyes, distorted face, deformed body, unrealistic proportions, plastic skin, cropped head, cut-off hands, cut-off feet, floating jewelry, missing jewelry, duplicate person, multiple people, watermark, text, logo, signature.
```

---

## Ref Images (face only)
ใช้เฉพาะ: `w12 (19)`, `w12 (20)`, `w12 (23)`, `w12 (24)`, `w12 (53)`
หมุน pair ต่างกันแต่ละโพส — ห้ามใช้คู่เดิมซ้ำติดกัน

---

## Theme Rotation (หมุนไม่ซ้ำ)

เช็ค `THEME_INDEX.md` ก่อน gen ทุกครั้ง — กันธีมซ้ำ
หมุน 6 pillars: ออกกำลังกาย / เที่ยว / ถ่ายรูป / แฟชั่น / ลองของใหม่ / activity

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v6 | 2026-06-23 | 3 modes (close-up f/1.4 / half f/2.0 / full f/2.8), skin detail (glass skin + realistic texture), negative prompt, section headers with emoji, lighting direction+tone, expression separated, hair interaction, learnings from Master J prompts |
| v5 | 2026-06-22 | proportion 1:7.5, Master J quality block, sharpness f/2.8, face ref v2 |
