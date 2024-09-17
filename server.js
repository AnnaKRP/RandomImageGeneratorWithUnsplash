const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fetch = require('node-fetch'); // Use node-fetch with require

dotenv.config();

const app = express();

// __dirname is already available in CommonJS, no need to define it.
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API route to fetch a random image
app.get('/api/random-image', async (req, res) => {
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

// Start the server if not in production (for local dev)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for Vercel (CommonJS)
module.exports = app;
