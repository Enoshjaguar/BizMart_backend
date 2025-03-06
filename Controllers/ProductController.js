const Company = require('../Models/company')
const Product = require('../Models/product')
const mongoose = require('mongoose')
const addproduct = async(req,res)=>{
    const {name,price,description} = req.body
    const image = req.file? req.file.path:null
    const {id} = req.params
    try{
        const company = await Company.findById(id)
        if(!company){
            console.log("company not found",id)
            return res.status(400).json({message:"company not found"})
        }

        const newproduct = new Product({name,price,description,company:id,image})
        const savedproduct = await newproduct.save()
        company.products.push(savedproduct._id)
        await company.save()

        if(!savedproduct){
            console.log("product saving failed")
            return res.status(500).json({message:"product saving failed"})
        }
        company.products.push(savedproduct._id)
        await company.save()
        console.log("product saevd successfully")
        return res.status(200).json({message:"product saved successfully"})
    }
    catch (error) {
        console.error("Product saving failed", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}





const getallproducts = async(req,res)=>{
    try {
        const products = await Product.find()
        if(!products || products.length===0){
            console.log("no products available")
            return res.status(500).json({message:"np products available"})
        }
        console.log("products fetched successfully")
        return res.status(200).json({message:"all products fetched",products})
    } catch (error) {
        console.error("products fetching failed",error)
        return res.status(200).json({message:"prducts fetching failed"})
        
    }
}

const getproductsbycompanyid = async(req,res)=>{
    const {id} = req.params
    try{
        const company = await Company.findById(id)
        if(!company){
            console.log("company not found")
            return res.status(500).json({message:"company not found"})
        }

        const companyname = company.name
       
        const products = await Product.find({company:id})
        console.log("prodcts fetched by company id")
        return res.status(200).json({message:"products fetched",companyname:companyname,products:products})
    }
    catch (error) {
        console.error("products fetching failed",error)
        return res.status(200).json({message:"prducts fetching failed"})
        
    }
}

const getproductbyid = async(req,res)=>{
    const {id} = req.params
    try{
        const product = await Product.findById(id).populate('company')
        if(!product){
            console.log("no product available")
            return res.status(500).json({message:"no product available"})
        }
        console.log("product fetched by id")
        return res.status(200).json({message:"product fetched by id",product})
    }
    catch (error) {
        console.error("products fetching failed",error)
        return res.status(200).json({message:"prducts fetching failed"})
        
    }
}

module.exports = {addproduct,getallproducts,getproductsbycompanyid,getproductbyid}