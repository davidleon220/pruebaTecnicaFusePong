const express = require("express");
const sequelize = require("./config/database.js");
const userRoutes = require('./routes/userRoutes.js');
const companyRoutes = require('./routes/companyRoutes.js');
const cors = require('cors');



// Importar los modelos
const User = require('./models/User.js');
const Company = require('./models/Company.js');
const router = express.Router();

// Importar las asociaciones
require('./models/associations.js');

const app = express();

// Middlewares
app.use(express.json());
app.use(router);
app.use('/api', userRoutes);
app.use('/api', companyRoutes);
app.use(cors());

// Endpoint para obtener todas las compañías
router.get('/api/companies', async (req, res) => {
  try {
      const companies = await Company.findAll();
      res.json(companies);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener las compañías' });
  }
});

router.get('/api/users', async (req, res) => {
  try {
      const users = await User.findAll({ include: Company }); // Asegúrate de que Company está correctamente importado
      res.json(users);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});


module.exports = router;

// Prueba de conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log("Conexión exitosa a la base de datos."))
  .catch((err) => console.log("Error al conectar a la base de datos:", err));

// Sincronizar los modelos
sequelize
  .sync({ force: false }) // Cambia a true solo si deseas reiniciar la base de datos
  .then(() => console.log("Base de datos y tablas sincronizadas."))
  .catch((err) => console.log("Error al sincronizar los modelos:", err));

// Define las asociaciones después de importar ambos modelos
Company.hasMany(User, { foreignKey: 'companyId' });
User.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = {
  User,
  Company
};

  // Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
