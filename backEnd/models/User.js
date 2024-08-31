const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Company', // El nombre del modelo, no de la tabla
      key: 'id',
    },
    allowNull: true, // O false si es obligatorio
  },
}, {
  timestamps: true,
});

module.exports = User;
