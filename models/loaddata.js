const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const loaddataSchema = mongoose.Schema({
    fullname: {
        type: String,
        required:true
    },
    status: {
        type: String,
        required:true
    },
    time: {
        type: String,
        required:true
        },
    loadimage:{
        type:String
    }
    });


const LoadData = mongoose.model('Loaddata',loaddataSchema);
module.exports = LoadData;


