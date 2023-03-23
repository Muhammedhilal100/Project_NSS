const db = require('../config/connection');

module.exports={

    secretary_project :function(value){
        db.collection('secretary_project').insertOne(value)
    },
    secretary_camp :function(value){
        db.collection('secretary_camp').insertOne(value)
    },
    secretary_message :function(value){
        db.collection('secretary_message').insertOne(value)
    }
    
}