# 🚀 เริ่มต้นใช้งาน Zeus Sport Ecosystem

## สารบัญ
1. [ความต้องการระบบ](#ความต้องการระบบ)
2. [การติดตั้ง](#การติดตั้ง)
3. [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
4. [การตั้งค่า](#การตั้งค่า)

---

## ความต้องการระบบ

- **Node.js**: v18.0.0 ขึ้นไป
- **npm**: v9.0.0 ขึ้นไป (หรือ yarn v1.22+)
- **Git**: v2.30+
- **OS**: macOS, Windows, หรือ Linux

---

## การติดตั้ง

### 1. Clone Repository

```bash
git clone https://github.com/taekhalifa420-tech/zeus-sport-ecosystem.git
cd zeus-sport-ecosystem
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` จาก template:

```bash
cp .env.example .env
```

แก้ไขไฟล์ `.env` ด้วยค่าที่ถูกต้อง:

```env
# Lazada API
LAZADA_APP_KEY=your_app_key
LAZADA_APP_SECRET=your_app_secret
LAZADA_ACCESS_TOKEN=your_access_token

# TikTok API
TIKTOK_API_KEY=your_api_key
TIKTOK_API_SECRET=your_api_secret

# Database (ถ้ามี)
DATABASE_URL=your_database_url

# Other
JWT_SECRET=your_jwt_secret
API_BASE_URL=http://localhost:3000
```

### 4. รัน Development Server

```bash
# รันทั้งหมด
npm run dev

# หรือรันแยกแต่ละ app
npm run dev:dashboard
npm run dev:lazada-tools
npm run dev:content-factory
```

---

## โครงสร้างโปรเจกต์

```
zeus-sport-ecosystem/
├── apps/                    # Applications
│   ├── dashboard/          # 🖥️ Zeus HQ Dashboard
│   ├── lazada-tools/       # 🛒 Lazada Management Tools
│   └── content-factory/    # 🎬 TikTok Content System
├── packages/               # Shared Packages
│   ├── design-system/      # 🎨 Olympus Design System
│   ├── ui/                 # 🧩 Shared UI Components
│   └── utils/              # 🛠️ Utility Functions
├── docs/                   # 📚 Documentation
├── scripts/                # 🤖 Automation Scripts
├── .github/                # ⚙️ GitHub Config
└── package.json            # Root Package
```

---

## การตั้งค่า

### GitHub Actions (CI/CD)

ระบบจะ Auto-deploy เมื่อ:
- Push ไปที่ `main` branch
- สร้าง Pull Request
- สร้าง Release

### GitHub Projects

ใช้จัดการ Task และ Track Progress:
- [Zeus Sport Roadmap](../../projects)

---

## ❓ มีปัญหา?

ถ้าพบปัญหา กรุณา [สร้าง Issue](https://github.com/taekhalifa420-tech/zeus-sport-ecosystem/issues) ใหม่

---

**⬅️ กลับไปที่ [หน้าหลัก](../README.md)**
