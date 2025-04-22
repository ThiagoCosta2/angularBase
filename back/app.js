const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuarios');

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);

module.exports = app;


//npm install cors
//node server.js