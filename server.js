import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// CORS headers (so your HTML can load iframe from another domain)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// /search route
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send("Missing query parameter 'q'");
  }

  try {
    // Fetch Google search results page
    const response = await fetch(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    const body = await response.text();

    // Send back HTML (raw Google page)
    res.send(body);
  } catch (err) {
    res.status(500).send("Error fetching search results");
  }
});

app.listen(PORT, () => {
  console.log(`XLTRA Search proxy running on port ${PORT}`);
});
