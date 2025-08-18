const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = 3000;

const symbol = 'AAPL';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Pfad zum views-Ordner

app.use(express.static('public'));

app.get('/api/stock', async (req, res) => {
  try {
    const response = await fetch(`https://api.marketdata.app/v1/stocks/prices/${symbol}/`);
    const data = await response.json();
    const kurs = data.mid[0];
    res.json({ symbol, kurs });
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
  }
});

app.get('/', async (req, res) => {
  try {
    const response = await fetch(`https://api.marketdata.app/v1/stocks/prices/${symbol}/`);
    const data = await response.json();
    const kurs = data.mid[0];

    res.render('index', { symbol, kurs });
  } catch (err) {
    res.status(500).send('Fehler beim Laden der Seite');
  }
});

app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});
