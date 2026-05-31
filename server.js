const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const ROOT = __dirname;
const JSON_PATH = path.join(ROOT, 'data', 'resume.json');
const JS_PATH = path.join(ROOT, 'js', 'resume-data.js');

app.use(express.json({ limit: '2mb' }));
app.use(express.static(ROOT));

app.get('/', (_req, res) => res.redirect('/sindhu.html'));

app.post('/api/save-resume', (req, res) => {
  try {
    const data = req.body;
    if (!data || !data.profile) {
      return res.status(400).json({ error: 'Invalid portfolio data' });
    }

    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(JSON_PATH, json, 'utf8');
    fs.writeFileSync(JS_PATH, `const RESUME_DEFAULT_DATA = ${json};\n`, 'utf8');

    res.json({ ok: true, savedAt: new Date().toISOString() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save portfolio' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Portfolio site running at http://localhost:${PORT}`);
  console.log(`  Portfolio:  http://localhost:${PORT}/sindhu.html`);
  console.log(`  Admin:      http://localhost:${PORT}/sindhu-admin.html`);
});
