'use strict'

const ProductoSucursal = require('../models/productoSucursal.model');
const ProductoEmpresa = require('../models/productoEmpresa.model');
const Sucursal = require('../models/sucursal.model');
const {checkUpdate} = require('../utils/validate');

exports.actualizarProducto = async(req,res)=>{
    const productoSucursalID = req.params.id;
    const params = req.body;
    const check = await checkUpdate(params);
    if(check == true){
        const existProducto = await ProductoSucursal.findOne({_id:productoSucursalID});
        if(existProducto){
            const productoSucursalUpdated = await ProductoSucursal.findOneAndUpdate({_id : productoSucursalID},{
                stock : params.stock,
                ventas : params.ventas
            }).populate('sucursal').lean()
            const producto = await ProductoEmpresa.findOne({nombre:productoSucursalUpdated.nombre})
            await ProductoEmpresa.findOneAndUpdate({nombre:productoSucursalUpdated.nombre},{
                stock : (producto.stock+existProducto.stock*1) - params.stock
            },{new:true});
            return res.send({message:'Producto actualizado', productoSucursalUpdated});
        }else{
            return res.status(404).send({message:'Producto no encontrado'});
        }
    }else{
        return res.status(400).send({message:'Parametros no actualizables o vacios'});
    }
}

exports.eliminarProducto = async(req,res)=>{
    try{
        const productoSucursalID = req.params.id;
        const existProducto = await ProductoSucursal.findOne({_id:productoSucursalID})
        if(existProducto){
            const deleteProducto = await ProductoSucursal.findOneAndDelete({_id:productoSucursalID});
            if(deleteProducto){
                const producto = await ProductoEmpresa.findOne({nombre:existProducto.nombre})
                await ProductoEmpresa.findOneAndUpdate({nombre:existProducto.nombre},{
                    stock : producto.stock + existProducto.stock
                })
                return res.send({message:'producto eliminado satisfactoriamente'})    
            }else{
                return res.status(400).send({message:'No se pudo eliminar'});
            }
        }else{
            return res.status(404).send({message:'Producto no encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verProductosSucursal = async(req,res)=>{
    try{
        const sucursalID = req.params.id;
        const productos = await ProductoSucursal.find({sucursal:sucursalID},{},{sort:{ventas:-1}}).populate('sucursal').lean();
        if(productos){
            return res.send({productos})
        }else if(productos=[] || !productos){
            return res.status(404).send({message:'No se encontraron productos'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verProducto = async(req,res)=>{
    try{
        const productoSucursalID = req.params.id;
        const producto = await ProductoSucursal.findOne({_id:productoSucursalID}).populate('sucursal');
        if(producto){
            return res.send(producto)
        }else{
            return res.status(404).send({message:'produco no encontrado'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}