const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppliedByNameSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique : true
    },
    jobemail:{
        type:Array,
        required:true
    }
})

module.exports=mongoose.model('appliedbyname_Data',AppliedByNameSchema)