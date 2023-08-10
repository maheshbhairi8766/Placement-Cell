const mongoose = require('mongoose');
const { Image } = require('react-bootstrap');
const { Schema } = mongoose;

const UploadJobSchema = new Schema({
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
    Role:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:Image,
    }
})

module.exports=mongoose.model('user',UploadJobSchema)