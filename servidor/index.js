const express = require('express');
const app = express();

const db = require('./models');

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log(`Servidor escuchando en el puerto 3001`);
  });
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});

app.listen(3001, () => {
  console.log(`Servidor escuchando en 3001`);
});

