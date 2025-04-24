// models/User.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  // Hook to hash password before saving
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 8);
  });
  
  // Method to compare passwords
  User.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  
  return User;
};