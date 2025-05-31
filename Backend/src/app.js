require('dotenv').config();


const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors')

const app = express();
app.use(cors());

app.use(express.json());

app.use('/ai', aiRoutes); // Routes like /ai/get-review

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;
