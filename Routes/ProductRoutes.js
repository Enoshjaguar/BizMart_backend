const express = require('express')
 const productcontroller = require('../Controllers/ProductController')
const router = express()
const upload = require('../middlewares/multer')
router.post('/addproduct/:id',upload.single('image'),productcontroller.addproduct)
router.get('/allproducts',productcontroller.getallproducts)
router.get('/getproductbycompany/:id',productcontroller.getproductsbycompanyid)
router.get('/getproductbyid/:id',productcontroller.getproductbyid)
module.exports = router


