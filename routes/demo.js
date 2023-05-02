const express = require('express')
const app = express()
const port = 3000


let userID = '001'

let report = [
    {
        id: 1,
        name: 'Blod donation',
        pic: 'donate_blod.jpg',
        attendence: ['001', '002']
    },
    {
        id: 2,
        name: 'Fitness training',
        pic: 'fitness__.jpg',
        attendence: ['003', '004']
    },
    {
        id: 3,
        name: 'Inspire',
        pic: 'inspire.jpg',
        attendence: ['001', '002', '004']
    },
]

let report_submited_to_another_one = [
    {
        id: 0001,
        volunteer: '001',
        report_id: 1,
    },
    {
        id: 0002,
        volunteer: '002',
        report_id: 3,
    },
]


// slice with copare two collection true return mew array

const updatedStudents = report.slice().filter(value => {
    return !report_submited_to_another_one.some(value_submitted => value.id === value_submitted.report_id && value_submitted.volunteer === userID)
});

console.log(updatedStudents, 'result');



let newArry = []
updatedStudents.map((value) => {
    if (value.attendence.includes(userID) === true) newArry.push(value.name)
})
console.log(newArry);
















app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})