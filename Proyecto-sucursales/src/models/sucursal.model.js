'use strict'

const mongoose = require('mongoose');

const sucursalSchema ={
    direccion : String,
    telefono : String,
    empresa : {type : mongoose.Schema.ObjectId, ref:'Empresa'}
}

module.exports = mongoose.model('Sucursal', sucursalSchema);