const express = require('express')
const router = express.Router()
const companycontroller = require('../Controllers/CompanyController')
const upload = require('../middlewares/multer')
router.post('/addcompany',upload.single('image'),companycontroller.addcompany)
router.get('/allcompanies',companycontroller.getallcompanies)
router.get('/getcompanybyid/:id',companycontroller.getcompanybyid)
module.exports = router