const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public')); // serve frontend HTML

// Proxy route
app.get('/search', async (req, res) => {
  try {
    const query = encodeURIComponent(req.query.q || '');
    if (!query) return res.send('No search query provided');

    // Use Google search (lite version for faster loading)
    const url = `https://www.google.com/search?q=${query}&hl=en&igu=1`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0' // mimic browser
      }
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching search results');
  }
});

app.listen(PORT, () => console.log(`XLTRASEARCH proxy running on port ${PORT}`));
