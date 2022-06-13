'use strict'

const productoEmpresaController = require('../controllers/productoEmpresa.controller');
const express = require('express');
const app = express.Router();
const mdAuth = require('../services/authenticated');

app.post('/agregarProducto', [mdAuth.ensureAuth], productoEmpresaController.agregarProducto);
app.put('/actualizarProducto/:id', [mdAuth.ensureAuth], productoEmpresaController.actualizarProducto);
app.delete('/eliminarProducto/:id', [mdAuth.ensureAuth], productoEmpresaController.eliminarProducto);
app.get('/verProductos', [mdAuth.ensureAuth], productoEmpresaController.verProductos);
app.get('/verProducto/:id', [mdAuth.ensureAuth], productoEmpresaController.verProducto);
app.post('/buscarProductos', [mdAuth.ensureAuth], productoEmpresaController.buscarProducto);
app.get('/productosMayor', [mdAuth.ensureAuth], productoEmpresaController.productosMayor);
app.get('/productosMenor', [mdAuth.ensureAuth], productoEmpresaController.productosMenor);

module.exports = app;