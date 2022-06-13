'use strict'

const ProductoEmpresa = require('../models/productoEmpresa.model');
const Empresa = require('../models/empresa.model');
const {validateData, checkUpdate} = require('../utils/validate');

exports.agregarProducto = async(req,res)=>{
    try{
        const empresaID = req.user.sub;
        const params = req.body;
        const data = {
            nombre : params.nombre,
            proveedor : params.proveedor,
            stock : params.stock,
            empresa : empresaID
        }
        const msg = await validateData(data);
        if(!msg){
            const existEmpresa = await Empresa.findOne({_id:empresaID})
            if(existEmpresa){ 
                const productoEmpresa = await new ProductoEmpresa(data);
                productoEmpresa.save();
                return res.send({message:'Productos agregados', productoEmpresa});
            }else{
                return res.status(404).send({message:'No puedes agregar productos a una empresa inexistente'})
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.actualizarProducto = async(req,res)=>{
    try{
        const productoID = req.params.id;
        const params = req.body;
        const check = await checkUpdate(params);
        const existProducto = await ProductoEmpresa.findOne({_id:productoID});
        const empresaID = req.user.sub;
        if(check){
            if(existProducto && existProducto.empresa == empresaID){
                const existingNombre = await ProductoEmpresa.findOne({nombre : params.nombre});
                if(!existingNombre){
                    const updatedProducto = await ProductoEmpresa.findOneAndUpdate({_id:productoID}, params,{new:true}).populate('empresa').lean();
                    return res.send(updatedProducto);
                }else{
                    return res.status(400).send({message:`El nombre de producto ${params.nombre} no esta disponible`});
                }
            }else{
                return res.status(404).send({message:'Producto no encontrado'});
            }
        }else{
            return res.status(400).send({message:'Parametros no actualizables o vacios'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.eliminarProducto = async(req,res)=>{
    try{
        const productoID = req.params.id;
        const empresaID = req.user.sub;
        const existingProducto = await ProductoEmpresa.findOne({_id:productoID});
        if(existingProducto && existingProducto.empresa == empresaID){
            const productoDeleted = await ProductoEmpresa.findOneAndDelete({_id:productoID});
            if(productoDeleted){
                return res.send({message:'producto eliminado satisfactoriamente'})
            }else{
                return res.status(400).send({message:'No se pudo eliminar el producto'});
            }
        }else{
            return res.status(404).send({message:'Producto no encontrado en tu empresa'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verProductos = async(req,res)=>{
    try{
        const empresaID = req.user.sub;
        const productos = await ProductoEmpresa.find({empresa:empresaID}).populate('empresa').lean();
        if(productos){
            return res.send({productos});
        }else{
            return res.status(404).send({message:'No se encontraron productos'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verProducto = async(req,res)=>{
    try{
        const productoID = req.params.id;
        const empresaID = req.user.sub;
        const producto = await ProductoEmpresa.findOne({_id:productoID, empresa: empresaID}).populate('empresa').lean();
        if(producto){
            return res.send(producto);
        }else{
            return res.status(404).send({message:'Producto no encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.buscarProducto = async(req,res)=>{
    try{
        const params = req.body;
        const empresaID = req.user.sub;
        const productos = await ProductoEmpresa.find({
            nombre:{$regex:params.nombre, $options:'i'},
            proveedor:{$regex:params.proveedor, $options:'i'},
            empresa: empresaID}).populate('empresa').lean();
        if(productos){
            return res.send(productos);
        }else if(productos==[] || !productos){
            return res.status(404).send({message:'No se encontraron productos'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.productosMayor = async(req,res)=>{
    try{
        const empresaID = req.user.sub;
        const productos = await ProductoEmpresa.find({empresa:empresaID}).sort({stock:-1});
        if(productos){
            return res.send(productos);
        }else if(productos == [] || !productos){
            return res.status(404).send({message:'No se encontraron productos'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.productosMenor = async(req,res)=>{
    try{
        const empresaID = req.user.sub;
        const productos = await ProductoEmpresa.find({empresa:empresaID}).sort({stock:1});
        if(productos){
            return res.send(productos);
        }else if(productos == [] || !productos){
            return res.status(404).send({message:'No se encontraron productos'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}