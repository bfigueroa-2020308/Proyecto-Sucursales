'use strict'

const Sucursal = require('../models/sucursal.model');
const {validateData, validateUpdate, checkUpdate} = require('../utils/validate');

exports.agregarSucursal = async(req,res)=>{
    try{    
        const params = req.body;
        const empresaID = req.user.sub
        const data ={
            direccion : params.direccion,
            telefono : params.telefono,
            empresa : empresaID
        }
        const msg = await validateData(data);
        if(!msg){
            const alreadyDireccion = await Sucursal.findOne({direccion:params.direccion});
            const alreadyTelefono = await Sucursal.findOne({telefono:params.telefono});
            if(!alreadyDireccion && !alreadyTelefono){
                const sucursal = await new Sucursal(data);
                sucursal.save();
                return res.send({message:'Sucursal agregada', sucursal});
            }else{
                return res.status(400).send({message:`El numero ${params.telefono} y la direccion ${params.direccion} no estan disponibles`});
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.actualizarSucursal = async(req,res)=>{
    try{
        const sucursalID = req.params.id;
        const params = req.body; 
        const check = await checkUpdate(params);
        if(check==true){
            const existingSucursal = await Sucursal.findOne({_id:sucursalID, empresa: req.user.sub});
            if(existingSucursal){
                const alreadyNombre = await Sucursal.findOne({telefono : params.telefono});
                const alreadyDireccion = await Sucursal.findOne({direccion:params.direccion});
                if(!alreadyDireccion && !alreadyNombre){ 
                    const updatedSucursal = await Sucursal.findOneAndUpdate({_id:sucursalID}, params, {new:true}).populate('empresa').lean();
                    return res.send({message:'Sucursal actualizada', updatedSucursal});
                }else{
                    return res.status(400).send({message:`El numero o la direccion no estan disponibles`});
                }
            }else{
                return res.status(404).send({message:'Sucursal no encontrada en tu empresa'});
            }
        }else{
            return res.status(400).send({message:'parametros no actualizables o vacios'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.eliminarSucursal = async(req,res)=>{
    try{
        const sucursalID = req.params.id;
        const empresaID = req.user.sub;
        const existingSucursal = await Sucursal.findOne({_id:sucursalID, empresa:empresaID});
        if(existingSucursal){
            const sucursalDeleted = await Sucursal.findOneAndDelete({_id:sucursalID});
            if(sucursalDeleted){
                return res.send({message:'Sucursal eliminada'})
            }else{
                return res.status(400).send({message:'No se pudo eliminar'})            
            }
        }else{
            return res.status(404).send({message:'Sucursal no encontrada en tu empresa'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verSucursales = async(req,res)=>{
    try{
        const empresaID = req.user.sub;
        const sucursales = await Sucursal.find({empresa:empresaID}).populate('empresa').lean();
        if(sucursales){
            return res.send({sucursales});
        }else if(sucursales=[] || !sucursales){
            return res.status(404).send({message:'No se encontraron sucursales'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verSucursal = async(req,res)=>{
    const sucursalID = req.params.id;
    const empresaID = req.user.sub;
    const sucursal = await Sucursal.findOne({_id:sucursalID, empresa:empresaID}).populate('empresa').lean();
    if(sucursal){
        return res.send({sucursal});
    }else if(sucursal=[] || !sucursal){
        return res.status(404).send({message:'Sucursal no encontrada en tu empresa'});
    }
}