const express = require('express')
const mongoose = require('mongoose')
const comanyroutes = require('./Routes/CompanyRotes')
const productroutes = require('./Routes/ProductRoutes')
const app = express()
const cors = require('cors')
const path = require('path')

mongoose.connect('mongodb://localhost:27017/Companies')
.then(()=>console.log("database connected successfully"))
.catch((err)=>console.error("error conmecing to the database",err))
app.use(express.json())

app.use(express.urlencoded({ extended: true })); 

app.use(cors())
app.use('/uploads', express.static('uploads'));

app.use('/product',productroutes)
app.use('/company',comanyroutes)
app.listen(3007,()=>{
    console.log("server initiated at 3007")
})