const db = require('../config/connection');





module.exports ={

     unicod_register :function(value){
        db.collection('unicod_register').insertOne(value)
    }
    
}
