# 🤖 Automation Scripts

รวมสคริปต์อัตโนมัติสำหรับ Zeus Sport Ecosystem

## รายการสคริปต์

### 🛒 `lazada-sales-tracker.js`
ดึงยอดขายจาก Lazada API และแสดงสรุป

```bash
# ดึงยอดขายวันนี้
node scripts/lazada-sales-tracker.js

# ดึงยอดขายวันที่ระบุ
node scripts/lazada-sales-tracker.js --date=2026-06-28
```

### 🎬 `content-scheduler.js`
จัดการตารางโพสต์คอนเทนต์

```bash
# สร้างตารางใหม่
node scripts/content-scheduler.js generate

# แสดงตารางปัจจุบัน
node scripts/content-scheduler.js show

# อัพเดทสถานะ
node scripts/content-scheduler.js update --id=content-2026-06-30 --status=filming
```

---

## Environment Variables

สคริปต์ทั้งหมดต้องการไฟล์ `.env` ใน root directory:

```env
LAZADA_APP_KEY=your_app_key
LAZADA_APP_SECRET=your_app_secret
LAZADA_ACCESS_TOKEN=your_access_token
```
