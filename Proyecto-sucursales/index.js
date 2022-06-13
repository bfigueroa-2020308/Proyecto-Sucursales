'use strict'

const MongoConfig = require('./config/mongoConfi');
const app = require('./config/app');
const port = 3000;

MongoConfig.init();
app.listen(port, ()=>{
    console.log(`Server running in port ${port}`);
})