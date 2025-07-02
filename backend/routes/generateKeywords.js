// routes/generateKeywords.js
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.post('/', async (req, res) => {
  const { keyword } = req.body;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const requestBody = {
    contents: [{
      parts: [{
        text: `Generate 5 related keywords for SEO optimization for the following word: ${keyword}. Return the response as a simple list of keywords, one per line.`
      }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const keywords = text.split('\n').map(k => k.trim()).filter(k => k).slice(0, 5);

    res.json({ keywords });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
