'use strict'

const express = require('express');
const sucursalController = require('../controllers/sucursal.controller');
const app = express.Router();
const mdAuth = require('../services/authenticated');

app.post('/agregarSucursal', [mdAuth.ensureAuth], sucursalController.agregarSucursal);
app.put('/actualizarSucursal/:id', [mdAuth.ensureAuth], sucursalController.actualizarSucursal);
app.delete('/eliminarSucursal/:id', [mdAuth.ensureAuth], sucursalController.eliminarSucursal);
app.get('/verSucursales', [mdAuth.ensureAuth], sucursalController.verSucursales);
app.get('/verSucursal/:id', [mdAuth.ensureAuth], sucursalController.verSucursal);

module.exports = app;