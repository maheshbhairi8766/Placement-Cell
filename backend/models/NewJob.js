const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewJob = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    CategoryName:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('job_Data',NewJob)