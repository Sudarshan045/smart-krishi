import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    console.log("Testing API Key:", process.env.OPENAI_API_KEY ? "Present (Length: " + process.env.OPENAI_API_KEY.length + ")" : "MISSING");
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hi" }],
    });
    console.log("Success! Response:", completion.choices[0].message.content);
  } catch (err) {
    console.error("API Key Test Failed!");
    console.error("Error Message:", err.message);
    console.error("Status Code:", err.status);
    console.error("Code:", err.code);
  }
}

test();
