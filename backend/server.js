require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors()); // ⚠️ Required to handle preflight OPTIONS requests

app.use(express.json());

// SQLite connection setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// Main server setup
const setupServer = async () => {
  try {
    console.log('🔌 Attempting DB connection...');
    await sequelize.authenticate();
    console.log('✅ Connected to SQLite database');

    const User = require('./models/User')(sequelize);
    console.log('📦 User model loaded');

    await sequelize.sync(); // Sync database schema
    console.log('🗃️ Database synced');

    // Load authentication routes
    const authRoutes = require('./routes/auth')(User);
    app.use('/api/auth', authRoutes);
    console.log('🔗 Auth routes loaded');

    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Setup failed:', err);
  }
};

setupServer();
