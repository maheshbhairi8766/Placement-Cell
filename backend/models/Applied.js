const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppliedSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique : true
    },
    job_data:{
        type:Array,
        required:true
    }
})

module.exports=mongoose.model('applied_Data',AppliedSchema)