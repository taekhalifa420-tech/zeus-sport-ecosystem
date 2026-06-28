# 🛒 E-Commerce Hub

> ระบบจัดการการขายบน Lazada และแพลตฟอร์มอื่นๆ

## ฟีเจอร์

### 📦 Inventory Management
- ติดตามสต็อกสินค้าแบบ Real-time
- แจ้งเตือนเมื่อสินค้าใกล้หมด
- จัดการสินค้าหลายแพลตฟอร์ม

### 💰 Sales Tracking
- ดึงยอดขายจาก Lazada API
- กราฟแสดงยอดขายรายวัน/เดือน/ปี
- เปรียบเทียบยอดขายแต่ละช่องทาง

### 🤖 Auto-pricing
- ปรับราคาอัตโนมัติตามคู่แข่ง
- กฎการตั้งราคาที่กำหนดเองได้
- Price history tracking

### 📊 Analytics
- Best seller analysis
- Customer behavior insights
- Conversion rate tracking

---

## API Endpoints

### Products
```
GET    /api/products          # ดึงรายการสินค้าทั้งหมด
GET    /api/products/:id      # ดึงข้อมูลสินค้า
POST   /api/products          # สร้างสินค้าใหม่
PUT    /api/products/:id      # อัพเดทสินค้า
DELETE /api/products/:id      # ลบสินค้า
```

### Orders
```
GET    /api/orders            # ดึงรายการคำสั่งซื้อ
GET    /api/orders/:id        # ดึงข้อมูลคำสั่งซื้อ
PUT    /api/orders/:id/status # อัพเดทสถานะ
```

### Analytics
```
GET    /api/analytics/sales   # ยอดขายสรุป
GET    /api/analytics/products # สถิติสินค้า
```

---

## การใช้งาน

### ดึงยอดขาย Lazada

```typescript
import { LazadaClient } from '@zeus/lazada-tools';

const client = new LazadaClient({
  appKey: process.env.LAZADA_APP_KEY,
  appSecret: process.env.LAZADA_APP_SECRET,
  accessToken: process.env.LAZADA_ACCESS_TOKEN
});

// ดึงยอดขายวันนี้
const todaySales = await client.getSales({
  startDate: '2026-06-28',
  endDate: '2026-06-28'
});

console.log(`ยอดขายวันนี้: ${todaySales.total} บาท`);
```

---

**⬅️ กลับไปที่ [หน้าหลัก](../README.md)**
