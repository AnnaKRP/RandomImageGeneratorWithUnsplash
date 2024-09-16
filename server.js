import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Required for __dirname-like behavior in ES modules
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Import node-fetch for the Unsplash API call

dotenv.config();

const app = express();

// These two lines are used to simulate __dirname in an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (like index.html and main.css) from the current directory
app.use(express.static(path.join(__dirname, '.')));

// API route to fetch a random image from Unsplash
app.get('/api/random-image', async (req, res) => {
    try {
      const clientID = process.env.MY_API_KEY;
      const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${clientID}`);
      const jsonData = await response.json();
  
      // Extract necessary data from the Unsplash response
      const imageData = {
        url: jsonData.urls.regular, // The image URL
        link: jsonData.links.html, // The image's Unsplash page link
        creator: jsonData.user.name, // The photographer's name
        likes: jsonData.likes, // Number of likes
      };
  
      // Send the extracted data to the front-end
      res.json(imageData);
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).send('Error fetching image');
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
