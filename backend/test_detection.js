import fs from 'fs';

async function testDiseaseDetection() {
  try {
    console.log('Reading image file...');
    const imageBuffer = fs.readFileSync('d:/Desktop/SE_CP/frontend/public/images/sc_redrot.png');
    const base64Image = imageBuffer.toString('base64');
    
    console.log('Sending request to backend API...');
    const response = await fetch('http://localhost:5000/api/ai/analyze-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image })
    });
    
    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error during test:', err);
  }
}

testDiseaseDetection();
