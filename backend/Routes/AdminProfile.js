const express = require("express")
const router = express.Router()
const Admin = require("../models/Admin")
const Applied = require("../models/Applied")
const AppliedByName = require("../models/AppliedByName")

router.post("/loadadmindata",async(req,res)=>{
    try {
        let mydata = await Admin.findOne({'email':req.body.email})
        res.json({adminData:mydata})
    } catch (error)
    {
        res.send("server error",error.message)
    }
})

router.post("/loadjobdata",async(req,res)=>{
    try {
        let mydata = await AppliedByName.findOne({'name':req.body.name})
        res.json({appliedEmail:mydata})
    } catch (error)
    {
        res.send("server error",error.message)
    }
})
module.exports = router;