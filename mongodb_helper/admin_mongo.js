const db = require('../config/connection');

module.exports={

    admin_account :function(value){
        db.collection('admin_account').insertOne(value)
    },
    admin_index :function(value){
        db.collection('admin_index').insertOne(value)
    },
    admin_message :function(value){
        db.collection('admin_message').insertOne(value)
    }
}