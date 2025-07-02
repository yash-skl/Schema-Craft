// routes/seoData.js
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/:keyword', async (req, res) => {
  const keyword = req.params.keyword;

  try {
    const response = await fetch(`https://seo-keyword-research-api.p.rapidapi.com/global-volume?keyword=${encodeURIComponent(keyword)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'seo-keyword-research-api.p.rapidapi.com'
      }
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
