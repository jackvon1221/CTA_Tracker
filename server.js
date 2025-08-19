// server.js
const express = require('express');
require('dotenv').config(); // Loads variables from .env file

const app = express();
const port = process.env.PORT || 3000; // Use the environment port or 3000

// server.js - Updated /api/trains route
app.get('/api/trains', async (req, res) => {
  // 1. Construct the URL for the CTA Train Tracker API
  // The 'stpid' parameter is for a station ID. We're using the default for Clark/Lake (40380) for now.
  const url = `https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${process.env.CTA_TRAIN_API_KEY}&mapid=40380&outputType=JSON`;

  try {
    console.log("Fetching data from CTA API..."); // Helpful log for debugging

    // 2. Fetch data from the CTA API
    const response = await fetch(url);

    // 3. Check if the HTTP response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`CTA API error! status: ${response.status}`);
    }

    // 4. Parse the JSON response from the API
    const data = await response.json();

    // 5. Send the train data back to the frontend
    res.json(data);

    console.log("Data sent to client successfully!"); // Helpful log

  } catch (error) {
    // 6. If anything fails above, send a 500 error and the message
    console.error("Fetch failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});