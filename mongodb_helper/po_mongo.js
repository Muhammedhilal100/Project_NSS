const db = require('../config/connection');

module.exports={

    po_account :function(value){
        db.collection('po_account').insertOne(value)
    },
    po_workdairy :function(value){
        db.collection('po_workdairy').insertOne(value)
    },
    po_meeting :function(value){
        db.collection('po_meeting').insertOne(value)
    },
    po_project_creation :function(value){
        db.collection('po_project_creation').insertOne(value)
    },
    po_camp_creation :function(value){
        db.collection('po_camp_creation').insertOne(value)
    },
    po_project_creation :function(value){
        db.collection('po_project_creation').insertOne(value)
    },
    po_camp_creation :function(value){
        db.collection('po_camp_creation').insertOne(value)
    },
    po_project_report :function(value,arr){
        value.pr = arr
        db.collection('po_project_report').insertOne(value)
    },
    po_camp_report :function(value,arr){
        value.cr = arr
        db.collection('po_camp_report').insertOne(value)
    },
    po_message :function(value){
        db.collection('po_message').insertOne(value)
    },
    
}