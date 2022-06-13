'use strict'

const Empresa = require('../models/empresa.model');
const ProductoEmpresa = require('../models/productoEmpresa.model');
const ProductoSucursal = require('../models/productoSucursal.model');
const Sucursal = require('../models/sucursal.model')
const bcrypt = require('bcrypt-nodejs');
const {validateData, checkUpdate} = require('../utils/validate');
const jwt = require('../services/jwt');

exports.existingAdmin = async()=>{
    try{ 
        const empresas = await Empresa.findOne({role:'ADMIN'});
        if(!empresas){
            const empresa = await new Empresa({
                nombre :'SuperAdmin',
                password : bcrypt.hashSync('123456'),
                role: 'ADMIN'
            })
            empresa.save();
        }else{
            console.log('Ya hay admin, bobolón')
        }
    }catch(err){
        console.log(err);
        return err;
    }
}
this.existingAdmin();


exports.agregarEmpresa = async(req,res)=>{
    try{
        const params = req.body;
        const data = {
            nombre : params.nombre,
            password : params.password,
            municipio : params.municipio,
            telefono : params.telefono,
            tipo : params.tipo,
            role : 'EMPRESA'
        }
        const msg = await validateData(data)
        if(!msg){
            const mismoNombre = await Empresa.findOne({nombre : params.nombre});
            if(!mismoNombre){ 
                data.password = bcrypt.hashSync(params.password);
                const empresa = await new Empresa(data);
                empresa.save();
                return res.send({message:'Empresa agregada', empresa});
            }else{
                return res.status(400).send({message:`El nombre '${params.nombre}' no esta disponible`})
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.login = async(req,res)=>{
    try{
        const params = req.body;
        const data ={
            nombre : params.nombre,
            password : params.password
        }
        const msg = await validateData(data)
        if(!msg){
            const empresaEncontrada = await Empresa.findOne({nombre : params.nombre});
            if(empresaEncontrada){
            const verificador = await bcrypt.compareSync(params.password, empresaEncontrada.password);
            if(empresaEncontrada.password && verificador==true){
                const token = await jwt.createToken(empresaEncontrada);
                return res.send({token, message:'Loggeado satisfactoriamente', empresaEncontrada});
            }else{
                return res.status(400).send({message:'credenciales invalidas'})
            }
        }else{
            return res.status(400).send({message:'credenciales invalidas'})
        }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.actualizarEmpresa = async(req,res)=>{
    try{
        const empresaID = req.params.id;
        const params = req.body;
        const check = await checkUpdate(params);
        const existenEmpresa = await Empresa.findOne({_id:empresaID});
        if(check == true){ 
            if(existenEmpresa){
                const nombreExistente = await Empresa.findOne({nombre: params.nombre});
                if(!nombreExistente){             
                    const updatedEmpresa = await Empresa.findOneAndUpdate({_id:empresaID}, params, {new:true});
                    return res.send({updatedEmpresa, message:'actualizado!'});
                }else{
                    return res.status(400).send({message:`El nombre ${params.nombre} no esta disponible`});
                }
            }else{
                return res.status(404).send({message:'la empresa no fue encontrada'});
            }
        }else{
            return res.status(400).send({message:'Parametros no actualizables o vacios'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.eliminarEmpresa = async(req,res)=>{
    try{
        const empresaID = req.params.id;
        const existingEmpresa = await Empresa.findOne({_id:empresaID});
        if(existingEmpresa){
            const empresaDeleted = await Empresa.findOneAndDelete({_id:empresaID}) 
            if(empresaDeleted){
                await Sucursal.deleteMany({empresa:empresaID});
                await ProductoEmpresa.deleteMany({empresa:empresaID});
                return res.send({message:'Empresa Eliminada Satisfactoriamente'});
            }else{
                return res.status(400).send({message:'No se pudo eliminar'});
            }
        }else{
            return res.status(404).send({message:'Empresa no encontrada'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verEmpresas = async(req,res)=>{
    try{
        const empresas = await Empresa.find();
        if(empresas){
            return res.send({empresas});
        }else if(empresas == []){
            return res.send({message:'No hay empresas'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verEmpresa = async(req,res)=>{
    try{
        const empresaID = req.user.sub;
        const empresa = await Empresa.findOne({_id:empresaID});
        if(empresa){
            return res.send(empresa);
        }else{
            return res.status(404).send({message:'Empresa no encontrada'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.enviarProducto = async(req,res)=>{
    try{
        const params = req.body
        const empresaID = req.user.sub;
        const sucursalID = req.params.id;
        const data ={
            producto : params.producto,
            stock : params.stock,
            ventas : 0,
            sucursal : sucursalID
        }
        const msg = await validateData(data);
        if(!msg){
            const existProducto = await ProductoEmpresa.findOne({_id:params.producto, empresa:empresaID});
            const existSucursal = await Sucursal.findOne({_id:sucursalID, empresa:empresaID});
            if(existProducto && existSucursal){
                if(existProducto.stock > params.stock){
                    const existProductoSucursal = await ProductoSucursal.findOne({nombre:existProducto.nombre, sucursal:sucursalID});
                    if(existProductoSucursal){ 
                        const productoSucursalUpdated = await ProductoSucursal.findOneAndUpdate({_id:existProductoSucursal._id},{
                            stock : existProductoSucursal.stock + params.stock*1
                        },{new:true});
                        await ProductoEmpresa.findOneAndUpdate({_id:params.producto},{
                            stock : existProducto.stock - params.stock
                        });
                        return res.send({message:'Producto Agregado', productoSucursalUpdated});
                    }else{
                        data.nombre = existProducto.nombre;
                        const productoSucursal = await new ProductoSucursal(data);
                        productoSucursal.save();
                        await ProductoEmpresa.findOneAndUpdate({_id:params.producto},{
                            stock : existProducto.stock - params.stock
                        });
                        return res.send({message:'Producto enviado', productoSucursal});        
                    }
                }else{
                    return res.status(400).send({message:'Stock insuficiente'})
                }
            }else{
                return res.status(400).send({message:'El producto o la sucursal no existen en tu empresa'});
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}