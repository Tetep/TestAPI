const express = require('express');
const app = express();

app.use(express.json());

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/v1/prospects', upload.single('image'), (req, res) => {
  const newProspect = {
    id: idCounter++,
    name: req.body.name,
    contact: req.body.contact,
    image: req.file ? {
      storedName: req.file.filename,
      originalName: req.file.originalname,
      url: `http://localhost:3000/uploads/${req.file.filename}`
    } : null
  };
  prospects.push(newProspect);
  res.status(201).json(newProspect);
});

app.use('/uploads', express.static('uploads'));



// Serve uploaded files as static assets
app.use('/uploads', express.static('uploads'));

// --- Routes your apiClient expects ---
app.get('/api/endpoint', (req, res) => {
  res.status(200).json({ data: [] });
});

app.post('/api/prospects', (req, res) => {
  const { name, email, phone } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  res.status(201).json({ id: Date.now(), name, email, phone });
});

// In index.js
// Seeded test clients
let prospects = [
  {
    id: 1,
    name: 'Acme Corp',
    contact: 'acme@example.com',
    image: { 
      originalName: 'sample1.jpg', 
      url: '/uploads/f6b801e193484741fc9c7b6f495aa1b9' 
    }
  },
  {
    id: 2,
    name: 'Globex Inc',
    contact: 'globex@example.com',
    image: { 
      originalName: 'sample2.jpg', 
      url: '/uploads/4b05b956f3e80866d105fcee1a268549' 
    }
  },
  {
    id: 3,
    name: 'Initech',
    contact: 'contact@initech.com',
    image: { 
      originalName: 'sample3.jpg', 
      url: '/uploads/12d373e1abe1a5ac283ebf5fcdf2a9df' 
    }
  },
  {
    id: 4,
    name: 'Umbrella Corp',
    contact: 'hq@umbrella.com',
    image: { 
      originalName: 'sample4.jpg', 
      url: '/uploads/025be09174c95daecc4db04119d9e81f' 
    }
  }
];

app.use('/uploads', express.static('uploads'));

// Existing /api/endpoint route
app.get('/api/endpoint', (req, res) => {
  res.status(200).json({ data: [] });
});

// Minimal in-memory store for prospects
//let prospects = [];
let idCounter = 1;

app.get('/v1/prospects', (req, res) => {
  res.status(200).json(prospects);
});

app.post('/v1/prospects', (req, res) => {
  const newProspect = { id: idCounter++, ...req.body };
  prospects.push(newProspect);
  res.status(201).json(newProspect);
});

app.get('/v1/prospects/:id', (req, res) => {
  const prospect = prospects.find(p => p.id === parseInt(req.params.id));
  if (!prospect) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(prospect);
});

app.put('/v1/prospects/:id', (req, res) => {
  const idx = prospects.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  prospects[idx] = { ...prospects[idx], ...req.body };
  res.status(200).json(prospects[idx]);
});

app.delete('/v1/prospects/:id', (req, res) => {
  const idx = prospects.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  prospects.splice(idx, 1);
  res.status(200).json({ message: 'Prospect deleted' });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for tests
module.exports = app;

// Only start server if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}


app.get('/', (req, res) => {
  res.send(`
    <h1>TestAPI is running 🚀</h1>
    <p>Try <a href="/v1/prospects">/v1/prospects</a> to see data</p>
  `);
});














app.get('/gallery', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Prospect Gallery</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #000;
          color: #fff;
          margin: 0;
          padding: 20px;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .card {
          background-color: #111;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.6);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.8);
        }
        .card img {
          width: 100%;
          height: auto;
          display: block;
        }
        .card-content {
          padding: 15px;
        }
        .card-content h3 {
          margin: 0 0 10px;
          font-size: 1.2em;
        }
        .card-content p {
          margin: 0;
          font-size: 0.9em;
          color: #bbb;
        }
      </style>
    </head>
    <body>
      <h1>Prospect Gallery</h1>
      <div class="grid">
        ${prospects.map(p => `
          <div class="card">
            ${p.image ? `<img src="${p.image.url}" alt="${p.name}">` : ''}
            <div class="card-content">
              <h3>${p.name}</h3>
              <p>${p.contact}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </body>
    </html>
  `;
  res.send(html);
});