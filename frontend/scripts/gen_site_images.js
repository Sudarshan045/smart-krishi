import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public/images');

const images = [
  // GUIDE - SUGARCANE SECTIONS
  { name: 'guide_sugarcane_land_prep', emoji: '🚜', label: 'Land Preparation', color1: '#8B6914', color2: '#5C4A0A', text: 'Deep Plowing · Harrowing · Furrow Making' },
  { name: 'guide_sugarcane_planting', emoji: '🌱', label: 'Sugarcane Planting', color1: '#2E8B4E', color2: '#1A5C2E', text: 'Setts · Row Spacing · Feb-March' },
  { name: 'guide_sugarcane_irrigation', emoji: '💧', label: 'Sugarcane Irrigation', color1: '#1E6EA8', color2: '#0E4E7A', text: 'Drip · 7-10 Day Intervals' },
  { name: 'guide_sugarcane_fertilizers', emoji: '🌿', label: 'Sugarcane Fertilizers', color1: '#4A7E2E', color2: '#2E5A1E', text: '250:125:125 NPK per Hectare' },
  { name: 'guide_sugarcane_pests', emoji: '🐛', label: 'Sugarcane Pest Management', color1: '#8B2E1E', color2: '#5C1A0E', text: 'Stem Borer · Pyrilla · Trichogramma' },
  { name: 'guide_sugarcane_harvest', emoji: '✂️', label: 'Sugarcane Harvesting', color1: '#8B6E1E', color2: '#5C4A0E', text: '10-12 Months · Process within 24hrs' },
  // GUIDE - GRAPES SECTIONS
  { name: 'guide_grapes_land_prep', emoji: '⛰️', label: 'Grape Land Preparation', color1: '#6E4A8B', color2: '#4E2A6E', text: '90x90x90cm Pits · 3x3m Spacing' },
  { name: 'guide_grapes_planting', emoji: '🍇', label: 'Grape Planting', color1: '#8B2E6E', color2: '#5C1A4E', text: 'Grafted Vines · Dec-January' },
  { name: 'guide_grapes_pruning', emoji: '✂️', label: 'Grape Vine Pruning', color1: '#4E2E8B', color2: '#2E1A6E', text: 'Back Pruning Apr-May · Forward Oct-Nov' },
  { name: 'guide_grapes_irrigation', emoji: '💦', label: 'Grape Drip Irrigation', color1: '#2E4E8B', color2: '#1A2E6E', text: 'Water by Growth Stage' },
  { name: 'guide_grapes_disease', emoji: '🍄', label: 'Grape Disease Management', color1: '#6E1A4E', color2: '#4E0A2E', text: 'Downy · Powdery Mildew · Anthracnose' },
  { name: 'guide_grapes_harvest', emoji: '🍇', label: 'Grape Harvesting', color1: '#4E1A6E', color2: '#2E0A4E', text: '120-140 Days · Sweet & Colored' },
  // SCHEMES CARDS
  { name: 'scheme_pmkisan', emoji: '💰', label: 'PM-KISAN Scheme', color1: '#1A4E8B', color2: '#0A2E5C', text: '₹6,000/year · 3 Installments' },
  { name: 'scheme_crop_insurance', emoji: '🛡️', label: 'Pradhan Mantri Fasal Bima', color1: '#1A6E3A', color2: '#0A4E2A', text: 'Low Premium · Crop Protection' },
  { name: 'scheme_soil_health', emoji: '🌱', label: 'Soil Health Card Scheme', color1: '#8B5E1A', color2: '#5C3A0A', text: 'Free Soil Testing · Recommendations' },
  { name: 'scheme_equipment_subsidy', emoji: '🚜', label: 'Maharashtra Krishi Samrudhi', color1: '#6E2E8B', color2: '#4E1A6E', text: '50% Subsidy · Farm Equipment' },
  { name: 'scheme_drip_irrigation', emoji: '💧', label: 'Micro Irrigation Fund', color1: '#1A6E7E', color2: '#0A4E5E', text: '80% Subsidy · Small Farmers' },
  { name: 'scheme_enam_market', emoji: '📱', label: 'National Agriculture Market', color1: '#3A2E8B', color2: '#2A1E6E', text: 'eNAM · Better Price Discovery' },
  // VIDEO THUMBNAILS
  { name: 'vid_sugarcane_guide', emoji: '🎬', label: 'Sugarcane Cultivation Guide', color1: '#2E7E2E', color2: '#1A5E1A', text: '15:30 · 125K Views' },
  { name: 'vid_grape_farming', emoji: '🍇', label: 'Grape Farming Techniques', color1: '#5E2E7E', color2: '#3E1A5E', text: '22:15 · 89K Views' },
  { name: 'vid_drip_irrigation', emoji: '💧', label: 'Drip Irrigation for Sugarcane', color1: '#2E5E8E', color2: '#1E3E6E', text: '12:45 · 67K Views' },
  { name: 'vid_pest_management', emoji: '🐛', label: 'Pest Management in Grapes', color1: '#7E2E1E', color2: '#5E1A0E', text: '18:20 · 54K Views' },
  { name: 'vid_organic_farming', emoji: '🌿', label: 'Organic Farming Methods', color1: '#3E7E2E', color2: '#2E5E1E', text: '25:00 · 210K Views' },
  { name: 'vid_govt_schemes', emoji: '🏛️', label: 'Government Schemes Guide', color1: '#2E3E7E', color2: '#1E2E5E', text: '20:15 · 98K Views' },
  { name: 'vid_soil_health', emoji: '🧪', label: 'Soil Health Management', color1: '#6E4E1E', color2: '#4E2E0E', text: '16:40 · 76K Views' },
  { name: 'vid_harvesting', emoji: '✂️', label: 'Harvesting Techniques', color1: '#4E7E1E', color2: '#2E5E0E', text: '14:30 · 82K Views' },
  // CROP CALENDAR MONTHLY ACTIVITIES
  { name: 'cal_land_prep', emoji: '🚜', label: 'Land Preparation', color1: '#7E5E1E', color2: '#5E3E0E', text: 'Jan-Feb · Plowing & Leveling' },
  { name: 'cal_planting', emoji: '🌱', label: 'Spring Planting Season', color1: '#2E7E3E', color2: '#1E5E2E', text: 'Feb-March · High Priority' },
  { name: 'cal_fertilizer', emoji: '💊', label: 'Fertilizer Application', color1: '#5E3E7E', color2: '#3E1E5E', text: 'April-May · First Dose' },
  { name: 'cal_weed_control', emoji: '🌿', label: 'Weed Control Activity', color1: '#4E6E1E', color2: '#2E4E0E', text: 'June · Regular Weeding' },
  { name: 'cal_pest_monitor', emoji: '🔍', label: 'Pest Monitoring', color1: '#7E2E2E', color2: '#5E1E1E', text: 'July · Watch for Stem Borer' },
  { name: 'cal_earthing_up', emoji: '⛰️', label: 'Earthing Up Soil', color1: '#7E5E2E', color2: '#5E3E1E', text: 'August · Soil Mounding' },
  { name: 'cal_irrigation_schedule', emoji: '⏰', label: 'Irrigation Schedule', color1: '#1E5E7E', color2: '#0E3E5E', text: 'September · Regular Watering' },
  { name: 'cal_growth_monitoring', emoji: '📊', label: 'Growth Monitoring', color1: '#2E5E3E', color2: '#1E3E2E', text: 'October · Check Crop Health' },
  { name: 'cal_maturity_phase', emoji: '🍬', label: 'Sugar Maturity Phase', color1: '#7E6E2E', color2: '#5E4E1E', text: 'November · Sugar Accumulation' },
  { name: 'cal_harvesting_ops', emoji: '✂️', label: 'Harvesting Operations', color1: '#5E7E1E', color2: '#3E5E0E', text: 'December · High Priority' },
  { name: 'cal_pruning', emoji: '✂️', label: 'Grape Vine Pruning', color1: '#4E2E6E', color2: '#2E1E4E', text: 'Jan & Dec · Critical' },
  { name: 'cal_post_harvest', emoji: '🧹', label: 'Post-Harvest Cleanup', color1: '#5E4E2E', color2: '#3E2E1E', text: 'November · Field Cleanup' },
  // HELP PAGE CONTACT CARDS
  { name: 'help_call_us', emoji: '📞', label: 'Call Us - Helpline', color1: '#1E6E3E', color2: '#0E4E2E', text: '1800-XXX-XXXX · Mon-Sat 9AM-6PM' },
  { name: 'help_email_us', emoji: '📧', label: 'Email Support', color1: '#1E3E7E', color2: '#0E2E5E', text: 'support@smartkrishi.com · 24hr Response' },
  { name: 'help_live_chat', emoji: '💬', label: 'Live Chat Support', color1: '#5E1E7E', color2: '#3E0E5E', text: 'Available 24/7 · Instant Support' },
  // CALCULATOR BANNERS
  { name: 'calc_sugarcane_banner', emoji: '🌾', label: 'Sugarcane Profit Calculator', color1: '#2E6E2E', color2: '#1E4E1E', text: 'Avg Yield 85T/ha · ₹3,200/Tonne' },
  { name: 'calc_grapes_banner', emoji: '🍇', label: 'Grapes Profit Calculator', color1: '#4E2E6E', color2: '#2E1E4E', text: 'Avg Yield 25T/ha · ₹60,000/Tonne' },
  // HOME STATS CARDS
  { name: 'stat_farmers', emoji: '👨‍🌾', label: '50,000+ Active Farmers', color1: '#2E7E4E', color2: '#1E5E2E', text: 'Maharashtra Farming Community' },
  { name: 'stat_guides', emoji: '📚', label: '100+ Expert Guides', color1: '#2E4E7E', color2: '#1E2E5E', text: 'Complete Farming Knowledge' },
  { name: 'stat_satisfaction', emoji: '⭐', label: '95% Satisfaction Rate', color1: '#7E6E1E', color2: '#5E4E0E', text: 'Trusted by Thousands of Farmers' },
  { name: 'stat_schemes', emoji: '🏛️', label: '20+ Govt Schemes Listed', color1: '#5E2E7E', color2: '#3E1E5E', text: 'Central & State Schemes' },
];

function makeSVG({ emoji, label, color1, color2, text }) {
  const words = label.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > 28) { lines.push(cur.trim()); cur = w; }
    else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  const labelY = lines.length === 1 ? 195 : 185;
  const labelLines = lines.map((l, i) =>
    `<text x="400" y="${labelY + i * 26}" font-size="22" font-weight="bold" fill="white" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" opacity="0.95">${l}</text>`
  ).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="280" viewBox="0 0 800 280">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="280" fill="url(#bg)" rx="0"/>
  <circle cx="700" cy="40"  r="90"  fill="white" opacity="0.06"/>
  <circle cx="120" cy="240" r="120" fill="white" opacity="0.05"/>
  <circle cx="400" cy="140" r="200" fill="white" opacity="0.03"/>
  ${Array.from({length:8}, (_,col)=>Array.from({length:4}, (_,row)=>
    `<circle cx="${50+col*100}" cy="${50+row*60}" r="2" fill="white" opacity="0.12"/>`
  ).join('')).join('')}
  <text x="400" y="115" font-size="64" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  ${labelLines}
  <text x="400" y="${labelY + lines.length * 26 + 10}" font-size="13" fill="white" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" opacity="0.7">${text}</text>
</svg>`;
}

let count = 0;
for (const img of images) {
  const svg = makeSVG(img);
  fs.writeFileSync(path.join(outDir, img.name + '.svg'), svg, 'utf8');
  count++;
  console.log(`✅ [${count}/${images.length}] ${img.name}.svg`);
}
console.log(`\n🎉 Done! Generated ${count} unique placeholder images.`);
