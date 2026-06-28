/**
 * 🎬 Content Scheduler
 * 
 * สคริปต์จัดการตารางโพสต์คอนเทนต์
 * 
 * การใช้งาน:
 * node scripts/content-scheduler.js --week=2026-W26
 */

const fs = require('fs');
const path = require('path');

// โฟลเดอร์เก็บคอนเทนต์
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const SCHEDULE_FILE = path.join(CONTENT_DIR, 'schedule.json');

// Template สำหรับแต่ละวัน
const CONTENT_TEMPLATES = {
  monday: { type: 'product_review', label: '🎥 Product Review' },
  tuesday: { type: 'tips', label: '💡 Tips & Tricks' },
  wednesday: { type: 'lifestyle', label: '🏃 Lifestyle' },
  thursday: { type: 'product_review', label: '🎥 Product Review' },
  friday: { type: 'promotion', label: '🎁 Promotion' },
  saturday: { type: 'behind_scenes', label: '🎬 Behind the Scenes' },
  sunday: { type: 'user_content', label: '👥 UGC Feature' }
};

/**
 * สร้างตารางคอนเทนต์ประจำสัปดาห์
 */
function generateWeeklySchedule(weekStart) {
  const schedule = [];
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  days.forEach((day, index) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + index);
    
    const template = CONTENT_TEMPLATES[day];
    schedule.push({
      id: `content-${date.toISOString().split('T')[0]}`,
      date: date.toISOString().split('T')[0],
      day: day,
      type: template.type,
      label: template.label,
      status: 'planned',
      platforms: ['tiktok'],
      title: '',
      script: '',
      notes: ''
    });
  });
  
  return schedule;
}

/**
 * บันทึกตาราง
 */
function saveSchedule(schedule) {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
  
  fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(schedule, null, 2));
  console.log(`✅ บันทึกตารางเรียบร้อย: ${SCHEDULE_FILE}`);
}

/**
 * แสดงตาราง
 */
function displaySchedule(schedule) {
  console.log('\n📅 ตารางคอนเทนต์ประจำสัปดาห์:\n');
  
  schedule.forEach(item => {
    const statusEmoji = {
      planned: '📝',
      writing: '✍️',
      filming: '🎥',
      editing: '✂️',
      ready: '✅',
      posted: '🚀'
    }[item.status] || '❓';
    
    console.log(`${statusEmoji} ${item.date} (${item.day})`);
    console.log(`   ${item.label}`);
    console.log(`   สถานะ: ${item.status}`);
    console.log(`   แพลตฟอร์ม: ${item.platforms.join(', ')}`);
    if (item.title) console.log(`   หัวข้อ: ${item.title}`);
    console.log('');
  });
}

/**
 * ฟังก์ชั่นหลัก
 */
function main() {
  const args = process.argv.slice(2);
  const weekArg = args.find(arg => arg.startsWith('--week='));
  const action = args.find(arg => !arg.startsWith('--')) || 'generate';
  
  if (action === 'generate') {
    // หาวันจันทร์ของสัปดาห์นี้
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    
    console.log(`📅 สร้างตารางสัปดาห์เริ่มต้น: ${monday.toISOString().split('T')[0]}`);
    
    const schedule = generateWeeklySchedule(monday);
    saveSchedule(schedule);
    displaySchedule(schedule);
    
    console.log('\n💡 ใช้คำสั่งนี้เพื่ออัพเดทสถานะ:');
    console.log('   node scripts/content-scheduler.js update --id=content-2026-06-30 --status=filming');
    
  } else if (action === 'show') {
    if (fs.existsSync(SCHEDULE_FILE)) {
      const schedule = JSON.parse(fs.readFileSync(SCHEDULE_FILE, 'utf8'));
      displaySchedule(schedule);
    } else {
      console.log('❌ ยังไม่มีตาราง ให้รันคำสั่ง generate ก่อน');
    }
  } else if (action === 'update') {
    const idArg = args.find(arg => arg.startsWith('--id='));
    const statusArg = args.find(arg => arg.startsWith('--status='));
    
    if (!idArg || !statusArg) {
      console.log('❌ ต้องระบุ --id และ --status');
      return;
    }
    
    const id = idArg.split('=')[1];
    const status = statusArg.split('=')[1];
    
    if (fs.existsSync(SCHEDULE_FILE)) {
      const schedule = JSON.parse(fs.readFileSync(SCHEDULE_FILE, 'utf8'));
      const item = schedule.find(i => i.id === id);
      
      if (item) {
        item.status = status;
        saveSchedule(schedule);
        console.log(`✅ อัพเดทสถานะ ${id} เป็น ${status}`);
      } else {
        console.log(`❌ ไม่พบคอนเทนต์ ID: ${id}`);
      }
    }
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateWeeklySchedule, saveSchedule, displaySchedule };
