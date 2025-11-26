const express = require('express');
const axios = require('axios');
const app = express();

// Allow cross-origin requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Proxy endpoint
app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).send('Missing query');

    try {
        // Fetch Google search results
        const response = await axios.get('https://www.google.com/search', {
            params: { q: query },
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        res.send(response.data);
    } catch (err) {
        res.status(500).send('Error fetching search results');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
