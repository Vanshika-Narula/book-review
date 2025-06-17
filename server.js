const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Use Routes
app.use('/', authRoutes);
app.use('/', bookRoutes);
app.use('/', reviewRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Server Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
