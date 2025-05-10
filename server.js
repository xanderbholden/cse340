const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve everything in /public as static files
app.use(express.static(path.join(__dirname, 'public')));

// Optional: fallback route (e.g. 404 or redirect to home)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
