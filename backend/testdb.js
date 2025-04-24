const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Test: Connected to SQLite');

    await sequelize.sync();
    console.log('✅ Test: Synced database');
  } catch (err) {
    console.error('❌ Test: Failed to connect:', err);
  }
};

test();
