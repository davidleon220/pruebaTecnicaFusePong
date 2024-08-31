const User = require('./User.js');
const Company = require('./Company.js');

// Relación: Una Compañía tiene muchos Usuarios
Company.hasMany(User, { foreignKey: 'companyId' });

// Relación: Un Usuario pertenece a una Compañía
User.belongsTo(Company, { foreignKey: 'companyId' });
