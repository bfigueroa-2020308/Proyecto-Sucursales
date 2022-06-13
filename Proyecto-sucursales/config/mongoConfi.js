'use strict'

const mongoose = require('mongoose');

exports.init=()=>{
    const UriMongo = 'mongodb://127.0.0.1:27017/SucursalesDB';
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', ()=>{
        console.log('ERROR|| Cant connect to MongoDB');
        mongoose.disconnect();
    })
    mongoose.connection.on('connecting',()=>{
        console.log('Connecting to MongoDB, please wait...');
    })
    mongoose.connection.on('connected',()=>{
        console.log('Connected to MongoDB');
    })
    mongoose.connection.once('open',()=>{
        console.log('Connected to database');
    })
    mongoose.connection.on('reconnected',()=>{
        console.log('Reconnected to database');
    })
    mongoose.connection.on('disconnected',()=>{
        console.log('Disconnected');
    })

    mongoose.connect(UriMongo,{
        useNewUrlParser: true,
        maxPoolSize : 50,
        connectTimeoutMS : 3000
    }).catch(err=>console.log(err));
        
}

