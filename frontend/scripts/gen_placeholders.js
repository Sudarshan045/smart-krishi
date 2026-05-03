import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const outDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const images = [
  // SOIL
  { name: 'soil_types_maharashtra', emoji: '🌑', label: 'Soil Types in Maharashtra', color1: '#8B5E3C', color2: '#5C3317', text: 'Black · Red · Laterite · Alluvial Soils' },
  { name: 'soil_testing_kit', emoji: '🧪', label: 'How to Test Your Soil', color1: '#4E8B6E', color2: '#2E5E4A', text: 'pH · NPK · Texture Testing' },
  { name: 'soil_ph_management', emoji: '⚖️', label: 'Soil pH Management', color1: '#8E6BBE', color2: '#5E3E9E', text: 'Acidic → Neutral → Alkaline' },
  { name: 'soil_fertility', emoji: '🌿', label: 'Improving Soil Fertility', color1: '#3A9E5E', color2: '#1E6E3E', text: 'Compost · Green Manure · Cover Crops' },
  // WATER
  { name: 'irrigation_types', emoji: '💧', label: 'Irrigation Types', color1: '#2E76B8', color2: '#1A4E8A', text: 'Drip · Sprinkler · Flood · Furrow' },
  { name: 'water_conservation', emoji: '🏠', label: 'Water Conservation', color1: '#1E9EAE', color2: '#0E7E8A', text: 'Rainwater Harvesting · Mulching' },
  { name: 'crop_water_requirements', emoji: '🌾', label: 'Crop Water Requirements', color1: '#2E8EC8', color2: '#1A5E8E', text: 'Sugarcane · Grapes · Cereals' },
  // CROPS
  { name: 'crop_categories', emoji: '🫘', label: 'Crop Categories', color1: '#5E9E3E', color2: '#3E7E2E', text: 'Cereals · Pulses · Cash Crops · Fruits' },
  { name: 'seasonal_crops', emoji: '🌧️', label: 'Seasonal Crops Maharashtra', color1: '#3E7EBE', color2: '#2E5E9E', text: 'Kharif · Rabi · Zaid Seasons' },
  { name: 'crop_rotation', emoji: '🔄', label: 'Crop Rotation Methods', color1: '#9E6E3E', color2: '#7E4E2E', text: 'Sugarcane → Wheat → Gram' },
  { name: 'companion_planting', emoji: '🌸', label: 'Companion Planting', color1: '#BE6E9E', color2: '#9E4E7E', text: 'Tomato + Basil · Corn + Beans' },
  // EQUIPMENT
  { name: 'manual_tools', emoji: '⛏️', label: 'Manual Farm Tools', color1: '#7E5E3E', color2: '#5E3E2E', text: 'Spade · Hoe · Sickle · Shears' },
  { name: 'farm_machinery', emoji: '🚜', label: 'Farm Machinery', color1: '#BE7E2E', color2: '#9E5E1E', text: 'Tractor · Rotavator · Harvester' },
  { name: 'irrigation_equipment', emoji: '🔧', label: 'Irrigation Equipment', color1: '#2E8EBE', color2: '#1E6E9E', text: 'Pumps · Drip System · Sprinklers' },
  { name: 'equipment_maintenance', emoji: '🛠️', label: 'Equipment Maintenance', color1: '#6E6E6E', color2: '#4E4E4E', text: 'Daily · Weekly · Seasonal Checks' },
  // PESTS
  { name: 'common_pests_solutions', emoji: '🐛', label: 'Common Pests & Solutions', color1: '#BE4E2E', color2: '#9E2E1E', text: 'Stem Borer · Aphids · Whitefly' },
  { name: 'common_diseases_solutions', emoji: '🍄', label: 'Common Diseases & Solutions', color1: '#9E2E5E', color2: '#7E1E4E', text: 'Mildew · Red Rot · Downy Mildew' },
  { name: 'organic_pest_control', emoji: '🌿', label: 'Organic Pest Control', color1: '#3E9E5E', color2: '#1E7E4E', text: 'Neem Oil · Garlic Spray · Trap Crops' },
  { name: 'pesticide_safety', emoji: '🥽', label: 'Pesticide Safety Guidelines', color1: '#E8A82E', color2: '#C87E1E', text: 'PPE · Dosage · Storage · Disposal' },
  // FERTILIZERS
  { name: 'npk_nutrients', emoji: '🔬', label: 'Understanding NPK', color1: '#5E3EBE', color2: '#3E2E9E', text: 'Nitrogen · Phosphorus · Potassium' },
  { name: 'organic_fertilizers', emoji: '🍂', label: 'Organic Fertilizers', color1: '#6E8E2E', color2: '#4E6E1E', text: 'Compost · Vermicompost · FYM' },
  { name: 'chemical_fertilizers', emoji: '🧪', label: 'Chemical Fertilizers', color1: '#3E6EBE', color2: '#2E4E9E', text: 'Urea · DAP · MOP · Complex NPK' },
  { name: 'fertilizer_application', emoji: '🌱', label: 'Fertilizer Application', color1: '#2E9E6E', color2: '#1E7E4E', text: 'Basal · Top Dressing · Foliar · Ferti' },
  // SEASONS
  { name: 'maharashtra_climate', emoji: '⛰️', label: 'Maharashtra Climate Zones', color1: '#E87E2E', color2: '#C85E1E', text: 'W.Ghats · W.Maha · Marathwada · Vidarbha' },
  { name: 'monsoon_preparation', emoji: '🌧️', label: 'Monsoon Preparation', color1: '#2E5EBE', color2: '#1E3E9E', text: 'Bunds · Seeds · Drainage · Kharif' },
  { name: 'winter_planning', emoji: '❄️', label: 'Winter Farming (Oct-Feb)', color1: '#4E8EBE', color2: '#2E6E9E', text: 'Rabi Crops · Pruning · Frost Care' },
  { name: 'summer_farming', emoji: '☀️', label: 'Summer Tips (Mar-May)', color1: '#E8C82E', color2: '#C89E1E', text: 'Mulching · Irrigation · Shade Nets' },
  // POST-HARVEST
  { name: 'harvesting_signs', emoji: '✅', label: 'Harvesting Signs & Timing', color1: '#3EBE6E', color2: '#1E9E4E', text: 'Sugarcane 12mo · Grapes 140days' },
  { name: 'harvesting_techniques', emoji: '✋', label: 'Harvesting Techniques', color1: '#6EBE3E', color2: '#4E9E1E', text: 'Manual · Mechanical · Grading' },
  { name: 'storage_methods', emoji: '🏠', label: 'Post-Harvest Storage', color1: '#2E6E9E', color2: '#1E4E7E', text: 'Cold Storage · Gunny Bags · Hygiene' },
  { name: 'value_addition', emoji: '💰', label: 'Value Addition & Processing', color1: '#E8781E', color2: '#C85E0E', text: 'Jaggery · Raisins · Pickles · Juice' },
];

function makeSVG({ emoji, label, color1, color2, text }) {
  // Wrap label text at ~30 chars
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
    <filter id="blur">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="800" height="280" fill="url(#bg)" rx="0"/>
  <!-- Decorative circles -->
  <circle cx="700" cy="40"  r="90"  fill="white" opacity="0.06"/>
  <circle cx="120" cy="240" r="120" fill="white" opacity="0.05"/>
  <circle cx="400" cy="140" r="200" fill="white" opacity="0.03"/>
  <!-- Grid dots -->
  ${Array.from({length:8}, (_,col)=>Array.from({length:4}, (_,row)=>
    `<circle cx="${50+col*100}" cy="${50+row*60}" r="2" fill="white" opacity="0.12"/>`
  ).join('')).join('')}
  <!-- Big emoji -->
  <text x="400" y="115" font-size="64" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  <!-- Label -->
  ${labelLines}
  <!-- Sub text -->
  <text x="400" y="${labelY + lines.length * 26 + 10}" font-size="13" fill="white" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" opacity="0.7">${text}</text>
</svg>`;
}

let count = 0;
for (const img of images) {
  const svg = makeSVG(img);
  const filepath = path.join(outDir, img.name + '.svg');
  fs.writeFileSync(filepath, svg, 'utf8');
  count++;
  console.log(`✅ [${count}/${images.length}] ${img.name}.svg`);
}
console.log(`\n🎉 Generated ${count} unique placeholder images in ${outDir}`);
