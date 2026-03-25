require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5001;

// ── Gemini Client Configuration ──────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
    { model: "gemini-1.5-flash" }, 
    { apiVersion: 'v1' } // Force v1 instead of v1beta
);

// ── Middleware ────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ── Health check ──────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
    const keyLoaded = !!process.env.GEMINI_API_KEY;
    res.json({
        status: 'ok',
        provider: 'google-gemini',
        keyLoaded,
        model: 'gemini-1.5-flash',
    });
});

// ── AI Portfolio Generation ───────────────────────────────────────
app.post('/api/generate', async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'GEMINI_API_KEY is missing from .env' });
        }

        const {
            name = '',
            title = '',
            bio = '',
            skills = '',
            experience = '',
            education = '',
            projects = '',
            contact = '',
            template = 'modern',
            userPrompt = '',
        } = req.body;

        console.log(`[Portify] 🤖 Gemini generating for: "${name || 'unknown'}"`);

        const prompt = `
Create a complete, professional portfolio for the following person.
Return ONLY a JSON object with this exact structure.

{
  "name": "Full Name",
  "title": "Professional Title",
  "tagline": "A short punchy tagline (max 10 words)",
  "bio": "A compelling 2-3 sentence professional summary",
  "skills": [
    { "category": "Category Name", "items": ["Skill1", "Skill2"] }
  ],
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Jan 2022 – Present",
      "highlights": ["Achievement 1", "Achievement 2"]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree Title",
      "year": "2023"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "What it does in 1-2 sentences",
      "tech": ["React", "Node.js"],
      "url": ""
    }
  ],
  "contact": {
    "email": "",
    "linkedin": "",
    "github": "",
    "website": ""
  },
  "template": "${template}"
}

--- USER'S RAW INFORMATION ---
Name: ${name}
Title: ${title}
Bio: ${bio}
Skills: ${skills}
Experience: ${experience}
Education: ${education}
Projects: ${projects}
Contact: ${contact}
${userPrompt ? `Extra instructions: ${userPrompt}` : ''}

Polish the content — fix grammar, expand thin descriptions, make achievements sound impactful. Do NOT invent facts.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();

        console.log('[Portify] ✅ Gemini response received');

        let portfolioData;
        try {
            portfolioData = JSON.parse(rawText);
        } catch (parseErr) {
            console.error('[Portify] JSON parse failed on Gemini output');
            return res.status(500).json({ error: 'Gemini returned invalid JSON', details: rawText });
        }

        return res.json({ success: true, data: portfolioData });

    } catch (err) {
        console.error('[Portify] ❌ Gemini Error:', err);
        return res.status(500).json({ error: err.message || 'Gemini Generation Failed' });
    }
});

app.listen(PORT, () => {
    console.log(`[Portify] 🚀 Gemini Server running -> http://localhost:${PORT}`);
    console.log(`[Portify] 🔑 API Key: ${process.env.GEMINI_API_KEY ? '✅ Loaded' : '❌ MISSING'}`);
});
