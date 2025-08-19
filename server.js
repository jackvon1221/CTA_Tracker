// server.js
const express = require('express');
require('dotenv').config(); // Loads variables from .env file

const app = express();
const port = process.env.PORT || 3000; // Use the environment port or 3000

// Serve static files from the current directory
app.use(express.static('.'));

// Dynamic API endpoint - accepts stationId parameter
app.get('/api/trains', async (req, res) => {
  // Get the stationId from the query parameter, default to Clark/Lake if not provided
  const stationId = req.query.stationId || '40380';
  
  // Construct the URL for the CTA API using the dynamic stationId
  const url = `https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${process.env.CTA_TRAIN_API_KEY}&mapid=${stationId}&outputType=JSON`;

  try {
    console.log(`Fetching data for station ID: ${stationId}...`);

    // Fetch data from the CTA API
    const response = await fetch(url);

    // Check if the HTTP response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`CTA API error! status: ${response.status}`);
    }

    // Parse the JSON response from the API
    const data = await response.json();

    // Send the train data back to the frontend
    res.json(data);

    console.log(`Data for station ${stationId} sent successfully!`);

  } catch (error) {
    // If anything fails above, send a 500 error and the message
    console.error("Fetch failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});