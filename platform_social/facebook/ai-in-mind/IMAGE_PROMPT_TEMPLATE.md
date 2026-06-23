# Ai_In_Mind — Image Prompt Template

> ใช้ template นี้ทุกครั้งที่สร้างรูปผ่าน ChatGPT Images pipeline

---

## Structure

```
[FACE REF LINE]
[SCENE DESCRIPTION]
[PROPORTION LINE]
[OUTFIT + ACCESSORIES]
[BACKGROUND + MOOD]
[MASTER J QUALITY BLOCK]
[SHARPNESS LINE]
```

---

## FACE REF LINE (บังคับ — ใส่บนสุดทุก prompt)

```
Use the uploaded photos as face reference — the generated person must be clearly recognizable as the same individual, but do NOT copy-paste the face directly. Instead, recreate the face naturally so it looks like the same person photographed on a different day with different lighting. Natural facial variations are expected and desired.
```

## PROPORTION LINE (บังคับเมื่อมี full body — ใส่หลัง scene)

```
CRITICAL PROPORTION RULE: The head must be realistically small relative to the body. Strict 1:7.5 head-to-body ratio. The head should be roughly 1/8 of total visible height. Do NOT enlarge the head. Realistic adult human proportions — NOT stylized, NOT doll-like, NOT anime proportions. If in doubt, make the head slightly smaller rather than larger.
```

## MASTER J QUALITY BLOCK (บังคับ — ใส่ท้ายทุก prompt)

```
Masterpiece, Ultra Photorealistic Portrait Photography, Hyper Realistic, 8K Ultra HD, RAW Photo, Ultra detailed skin texture, realistic pores, natural facial details, realistic eyes, natural hair strands, authentic smartphone photography, low-light realism, cinematic shadows, natural ambient lighting, shallow depth of field, realistic fabric texture, true-to-life colors, photorealistic human, natural imperfections, no CGI, no cartoon, no anime, no illustration, no plastic skin, no over-retouching, no artificial rendering.
```

## SHARPNESS LINE (บังคับ — ต่อท้าย quality block)

```
Photo quality: 4K ultra-high resolution, shot on professional DSLR camera (Canon EOS R5 or Sony A7R V Mark II), f/2.8 aperture, 1/500s shutter speed, ISO 200, commercial fashion model photography, tack-sharp focus throughout, true-to-life skin texture and hair detail, professional studio-grade natural lighting, editorial quality comparable to Vogue or Harper's Bazaar fashion shoots. Photorealistic, not AI-generated looking. No text, no logos, no brand names.
```

---

## ตัวอย่าง prompt เต็ม

```
Use the uploaded photos as face reference — the generated person must be clearly recognizable as the same individual, but do NOT copy-paste the face directly. Instead, recreate the face naturally so it looks like the same person photographed on a different day with different lighting. Natural facial variations are expected and desired.

A young Thai woman in her mid-20s [SCENE]. She wears [OUTFIT]. [HAIR]. [ACCESSORIES].

CRITICAL PROPORTION RULE: The head must be realistically small relative to the body. Strict 1:7.5 head-to-body ratio. The head should be roughly 1/8 of total visible height. Do NOT enlarge the head. Realistic adult human proportions — NOT stylized, NOT doll-like, NOT anime proportions. If in doubt, make the head slightly smaller rather than larger.

Background: [SETTING]. Mood: [MOOD].

Masterpiece, Ultra Photorealistic Portrait Photography, Hyper Realistic, 8K Ultra HD, RAW Photo, Ultra detailed skin texture, realistic pores, natural facial details, realistic eyes, natural hair strands, authentic smartphone photography, low-light realism, cinematic shadows, natural ambient lighting, shallow depth of field, realistic fabric texture, true-to-life colors, photorealistic human, natural imperfections, no CGI, no cartoon, no anime, no illustration, no plastic skin, no over-retouching, no artificial rendering.

Photo quality: 4K ultra-high resolution, shot on professional DSLR camera (Canon EOS R5 or Sony A7R V Mark II), f/2.8 aperture, 1/500s shutter speed, ISO 200, commercial fashion model photography, tack-sharp focus throughout, true-to-life skin texture and hair detail, professional studio-grade natural lighting, editorial quality comparable to Vogue or Harper's Bazaar fashion shoots. Photorealistic, not AI-generated looking. No text, no logos, no brand names.
```

---

## Theme Rotation (หมุนไม่ซ้ำ)

| ช่วง | ธีมที่ผ่านมา |
|------|-------------|
| เช้า วันธรรมดา | ช้อปปิ้ง/แฟชั่น, workout, café, cottagecore |
| บ่าย วันธรรมดา | กาแฟบ่าย/café work break |
| เช้า วันหยุด | (ใช้เฉพาะวัน ส-อ) |

---

## Ref Images (face only)
ใช้เฉพาะ: `w12 (19)`, `w12 (20)`, `w12 (23)`, `w12 (24)`, `w12 (53)`
หมุน pair ต่างกันแต่ละโพส — ห้ามใช้คู่เดิมซ้ำติดกัน

**Updated:** 2026-06-22 (S35-36: proportion 1:7.5, Master J quality block, sharpness f/2.8, face ref approach v2)
