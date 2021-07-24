const mongoose = require('mongoose')

const propertySchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    rent:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('property',propertySchema)