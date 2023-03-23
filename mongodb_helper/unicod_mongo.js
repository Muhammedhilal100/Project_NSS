const db = require('../config/connection');

module.exports={

    unicod_account :function(value){
        db.collection('unicod_account').insertOne(value)
    },
    unicod_message :function(value){
        db.collection('unicod_message').insertOne(value)
    }
}