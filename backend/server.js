const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const batchRoutes = require('./routes/batchRoutes');




dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use ('/api/batches', batchRoutes);



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
