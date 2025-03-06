const mongose = require('mongoose')

const CompanySchema = new mongose.Schema({
    name:{type:String,required:true},
    ceo:{type:String,required:true},
    headquarters:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    products:[{type:mongose.Schema.Types.ObjectId,ref:'Product'}]
})

const Company = mongose.model('Company',CompanySchema)
module.exports = Company
