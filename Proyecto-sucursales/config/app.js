'use strict'

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const empresaRoutes = require('../src/routes/empresas.routes');
const productoEmpresaRoutes = require('../src/routes/productoEmpresa.routes');
const sucursalRoutes = require('../src/routes/sucursal.routes');
const productoSucursalRoutes =require('../src/routes/productoSucursal.routes');

const app = express();

app.use(helmet());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/Empresa', empresaRoutes);
app.use('/ProductoEmpresa', productoEmpresaRoutes);
app.use('/Sucursal', sucursalRoutes);
app.use('/ProductoSucursal', productoSucursalRoutes);

module.exports = app;