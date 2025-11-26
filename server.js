import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from public/
app.use(express.static(path.join(__dirname, "public")));

// Proxy search route
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).send("Query missing");

  try {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).send("Error fetching search results");
  }
});

// Start server
app.listen(port, () => {
  console.log(`XLTRA Search running on port ${port}`);
});
