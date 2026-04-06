const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || true }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/leads', require('./routes/lead.routes'));

app.get('/', (req, res) => {
  res.send('SISFS API Running');
});

module.exports = app;
