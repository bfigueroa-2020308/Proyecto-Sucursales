'use strict'

const mongoose = require('mongoose');

const productoSucursalSchema = {
    nombre : String,
    stock : Number,
    ventas : Number,
    sucursal : {type: mongoose.Schema.ObjectId, ref:'Sucursal'}
}

module.exports = mongoose.model('ProductoSucursal', productoSucursalSchema);