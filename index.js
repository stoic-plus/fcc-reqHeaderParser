const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.get('/api/whoami', (req, res) => {
  console.log(req.headers['x-forwarded-for']);
  console.log(req.header['x-forwarded-for']);
  console.log(req.connection.remoteAddress);
  res.send({
    ipaddress: req.connection.remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent'],
  });
});

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
