const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:false},
    company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'}
})

const Product = new mongoose.model('Product',productSchema)
module.exports = Product