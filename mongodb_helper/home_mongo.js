const { response } = require('express');
const db = require('../config/connection');





module.exports ={

    

     unicod_register :function(value,callback){
         db.collection('unicod_register').insertOne(value).then((response)=>{
            callback(response)
        })},
     po_register :function(value,callback){
        db.collection('po_register').insertOne(value).then((response)=>{
            callback(response)
        })},
     volunteer_register :function(value,callback){
        db.collection('volunteer_register').insertOne(value).then((response)=>{
            callback(response)
        })},
    suggestion :function(value){
        db.collection('suggestion').insertOne(value)
    },
     feedback :function(value){
        db.collection('feedback').insertOne(value)
    }
    
}
