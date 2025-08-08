const express = require('express');
const cors = require('cors');
const batchRoutes = require('./routes/batchRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/batches', batchRoutes);

module.exports = app;
