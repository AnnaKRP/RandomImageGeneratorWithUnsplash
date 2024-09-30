const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const randomImageApi = require('./api/random-image'); // Import the API logic

dotenv.config();

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the random image API
app.use('/api', randomImageApi);

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server if not in production (for local dev)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


// Use the random image API
app.use('/api', randomImageApi);

// Log incoming requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.originalUrl}`);
  next();
});


// Export the app for Vercel (CommonJS)
module.exports = app;
