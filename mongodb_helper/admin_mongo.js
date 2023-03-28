const db = require('../config/connection');

module.exports={

    admin_account :function(value){
        db.collection('admin_account').insertOne(value)
    },
    admin_index_event :function(value){
        db.collection('admin_index_event').insertOne(value)
    },
    admin_index_news :function(value){
        db.collection('admin_index_news').insertOne(value)
    },
    admin_message :function(value){
        db.collection('admin_message').insertOne(value)
    }
}