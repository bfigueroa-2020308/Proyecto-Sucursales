'use strict'

const express = require('express');
const productoSucursalController = require('../controllers/productoSucursal.controller');
const app = express.Router();
const mdAuth = require('../services/authenticated');

app.put('/actualizarProducto/:id', [mdAuth.ensureAuth], productoSucursalController.actualizarProducto);
app.delete('/eliminarProducto/:id', [mdAuth.ensureAuth], productoSucursalController.eliminarProducto);
app.get('/verProductos/:id',[mdAuth.ensureAuth], productoSucursalController.verProductosSucursal);
app.get('/verProducto/:id', [mdAuth.ensureAuth], productoSucursalController.verProducto);

module.exports = app;