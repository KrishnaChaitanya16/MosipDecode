const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const batchRoutes = require('./routes/batchRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');




dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use ('/api/batches', batchRoutes);
app.use ('/api/users', userRoutes);
app.use ('/api/products', productRoutes);



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
