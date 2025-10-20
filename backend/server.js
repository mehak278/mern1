require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection (avoid passing deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .catch((err) => {
    console.error('Initial MongoDB connection error:', err);
    process.exit(1);
  });

const db = mongoose.connection;
db.on('connected', () => console.log('MongoDB connected'));
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.on('disconnected', () => console.warn('MongoDB disconnected'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Start server (ensure single listener)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
