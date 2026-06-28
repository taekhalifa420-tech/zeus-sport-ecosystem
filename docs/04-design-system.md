# 🎨 Olympus Design System

> ระบบออกแบบสินค้าและจัดการคอลเลคชั่น

## ฟีเจอร์

### 🎨 Design Catalog
- จัดเก็บดีไซน์ทั้งหมดเป็นหมวดหมู่
- Version control สำหรับแต่ละดีไซน์
- Export ไฟล์สำหรับโรงงาน

### 🤖 AI Variations
- สร้าง variations จาก concept
- ปรับแต่งสี ลวดลาย รายละเอียด
- Preview ก่อนสั่งผลิต

### 🏭 Factory Export
- ส่งไฟล์พร้อมสเปคให้โรงงาน
- รองรับหลายฟอร์แมต (PDF, AI, PNG)
- Track สถานะการผลิต

---

## Design Categories

```
olympus-designs/
├── socks/
│   ├── crew/
│   │   ├── zeus-lightning/
│   │   ├── zeus-minimal/
│   │   └── olympus-gods/
│   └── quarter/
│       ├── zeus-back-logo/
│       └── thunder-stripe/
├── jerseys/
│   ├── running/
│   ├── basketball/
│   └── lifestyle/
└── accessories/
    ├── caps/
    ├── bags/
    └── bands/
```

---

## Design Spec Template

```yaml
design_id: ZS-SOCK-001
name: "Zeus Lightning - Crew"
category: socks/crew
collection: "Olympus 2026"

specs:
  material: "80% Cotton, 15% Polyester, 5% Spandex"
  sizes: [EU 38-42, EU 43-47]
  colors:
    - name: "Thunder Black"
      hex: "#1A1A1A"
    - name: "Olympus Gold"
      hex: "#FFD700"
  
print:
  position: "Ankle area, back"
  method: "Jacquard weave"
  colors: 2

files:
  mockup: "./mockups/ZS-SOCK-001-mockup.png"
  tech_pack: "./tech-packs/ZS-SOCK-001-tech.pdf"
  factory_spec: "./factory/ZS-SOCK-001-spec.pdf"
```

---

**⬅️ กลับไปที่ [หน้าหลัก](../README.md)**
