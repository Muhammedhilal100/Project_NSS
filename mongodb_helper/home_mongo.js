const db = require('../config/connection');





module.exports ={

    

     unicod_register :function(value){
        db.collection('unicod_register').insertOne(value)
    },
     po_register :function(value){
        db.collection('po_register').insertOne(value)
    },
     volunteer_register :function(value){
        db.collection('volunteer_register').insertOne(value)
    },
    suggestion :function(value){
        db.collection('suggestion').insertOne(value)
    },
     feedback :function(value){
        db.collection('feedback').insertOne(value)
    }
    
}
