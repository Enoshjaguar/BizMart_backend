const { upload } = require('../middlewares/multer')
const Company = require('../Models/company')
const path = require('path')


const addcompany = async(req,res)=>{
    const {name,ceo,headquarters,description} = req.body
    const image = req.file ? req.file.path:null
    try{
        const newcompany = new Company({name,ceo,headquarters,description,image})
        const savedcompany = await newcompany.save()
        if(!savedcompany){
            console.log("company saving failed")
            return res.status(500).json({message:"company saving failed"})
        }
        console.log("company saved successfully")
        return res.status(200).json({message:"company saved sucessfully",company:newcompany})
    }
    catch(err){
        console.error("error saving the company",err)
    }
}

const getallcompanies = async(req,res)=>{
    const url = 'http://localhost:3007'
    try {
       const companies = await Company.find()
       if(!companies || companies.length===0){
        console.log("no companies available")
        return res.status(500).json({message:"no companies available"})
    }
        companies.forEach(company=>{
            if(company.image){
                company.image = `${url}/${company.image.replace(/\\/g, '/')}`
            }
        })
    console.log("all companies fetched successfully")
    return res.status(200).json({message:"all companies fetched successfully",companies})
    } catch (error) {
        console.error("cmpanies fetching failed",error)
        return res.status(200).json({message:"companies fetching failed"})
        
    }
}

const getcompanybyid = async(req,res)=>{
    const {id} = req.params
    const url = 'http://localhost:3007'
    try {
        const company = await Company.findById(id).populate('products')
        if(!company){
            console.log("compnay not found")
            return res.status(500).json({message:"company not found"})
        }
        if(company){
            company.image = `${url}/${company.image.replace(/\\/g, '/')}`
        }
         
         console.log("this is image",company.image)
        console.log("company found and fetched")
        return res.status(200).json({message:"company fetched successfully",company})
    } catch (error) {
        console.error("compnay fetching failed",error)
        return res.status(200).json({message:"company fetching failed"})
        
    }
}
module.exports = {addcompany,getallcompanies,getcompanybyid}