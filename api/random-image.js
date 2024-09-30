const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
require('dotenv').config();

// API route to fetch a random image
router.get('/random-image', async (req, res) => {
  try {
    const clientID = process.env.NEXT_PUBLIC_MY_API_KEY;
    const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${clientID}`);
    const jsonData = await response.json();
    res.json({
      url: jsonData.urls.regular,
      link: jsonData.links.html,
      creator: jsonData.user.name,
      likes: jsonData.user.total_likes
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
});

module.exports = router;
