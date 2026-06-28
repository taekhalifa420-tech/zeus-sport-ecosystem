/**
 * 🛒 Lazada Sales Tracker
 * 
 * สคริปต์ดึงยอดขายจาก Lazada และบันทึกลงฐานข้อมูล
 * 
 * การใช้งาน:
 * node scripts/lazada-sales-tracker.js --date=2026-06-28
 */

const axios = require('axios');
const crypto = require('crypto');

// Configuration
const CONFIG = {
  appKey: process.env.LAZADA_APP_KEY,
  appSecret: process.env.LAZADA_APP_SECRET,
  accessToken: process.env.LAZADA_ACCESS_TOKEN,
  apiUrl: 'https://api.lazada.co.th/rest'
};

/**
 * สร้าง Signature สำหรับ Lazada API
 */
function generateSignature(params, apiPath) {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}${params[key]}`)
    .join('');
  
  const stringToSign = `${apiPath}${sortedParams}`;
  return crypto
    .createHmac('sha256', CONFIG.appSecret)
    .update(stringToSign)
    .digest('hex')
    .toUpperCase();
}

/**
 * ดึงยอดขายตามช่วงวันที่
 */
async function getSales(startDate, endDate) {
  const apiPath = '/orders/get';
  const params = {
    app_key: CONFIG.appKey,
    timestamp: Date.now(),
    sign_method: 'sha256',
    access_token: CONFIG.accessToken,
    created_after: startDate,
    created_before: endDate,
    limit: 100
  };
  
  params.sign = generateSignature(params, apiPath);
  
  try {
    const response = await axios.get(`${CONFIG.apiUrl}${apiPath}`, { params });
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching sales:', error.message);
    throw error;
  }
}

/**
 * คำนวณสรุปยอดขาย
 */
function calculateSummary(orders) {
  const summary = {
    totalOrders: orders.length,
    totalRevenue: 0,
    totalItems: 0,
    averageOrderValue: 0,
    statusBreakdown: {}
  };
  
  orders.forEach(order => {
    summary.totalRevenue += parseFloat(order.price);
    summary.totalItems += order.items_count || 1;
    
    const status = order.status || 'unknown';
    summary.statusBreakdown[status] = (summary.statusBreakdown[status] || 0) + 1;
  });
  
  summary.averageOrderValue = summary.totalRevenue / summary.totalOrders;
  
  return summary;
}

/**
 * ฟังก์ชั่นหลัก
 */
async function main() {
  const args = process.argv.slice(2);
  const dateArg = args.find(arg => arg.startsWith('--date='));
  const date = dateArg ? dateArg.split('=')[1] : new Date().toISOString().split('T')[0];
  
  console.log(`📅 กำลังดึงยอดขายวันที่: ${date}`);
  
  try {
    const salesData = await getSales(date, date);
    const orders = salesData.data?.orders || [];
    
    console.log(`📦 พบ ${orders.length} คำสั่งซื้อ`);
    
    if (orders.length > 0) {
      const summary = calculateSummary(orders);
      
      console.log('\n📊 สรุปยอดขาย:');
      console.log(`  💰 รายได้รวม: ${summary.totalRevenue.toLocaleString()} บาท`);
      console.log(`  📦 จำนวนคำสั่งซื้อ: ${summary.totalOrders}`);
      console.log(`  📊 ค่าเฉลี่ยต่อออเดอร์: ${summary.averageOrderValue.toFixed(2)} บาท`);
      console.log(`  🏷️ จำนวนสินค้า: ${summary.totalItems}`);
      
      console.log('\n📋 สถานะคำสั่งซื้อ:');
      Object.entries(summary.statusBreakdown).forEach(([status, count]) => {
        console.log(`  ${status}: ${count}`);
      });
    } else {
      console.log('😢 ไม่พบคำสั่งซื้อในวันนี้');
    }
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { getSales, calculateSummary };
