const db = require('../config/connection');

module.exports={

    volunteer_workdairy :function(value){
        db.collection('volunteer_workdairy').insertOne(value)
    },
    volunteer_extra :function(value){
        db.collection('volunteer_extra').insertOne(value)
    }
}