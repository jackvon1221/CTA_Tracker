// server.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config(); // Loads variables from .env file

const app = express();
const port = process.env.PORT || 3000; // Use the environment port or 3000

// This will be our main route to fetch train data
app.get('/api/trains', async (req, res) => {
  res.json({ message: "Train data will go here soon!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});