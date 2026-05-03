const fs = require('fs');
const babel = require('@babel/parser');

const code = fs.readFileSync('d:/Desktop/SE_CP/frontend/src/pages/EnhancedCropDetail.jsx', 'utf-8');

try {
  babel.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log("Syntax OK!");
} catch (e) {
  console.error("Syntax Error:", e.message, "at line", e.loc.line, "column", e.loc.column);
}
