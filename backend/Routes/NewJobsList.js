const express = require("express")
const router = express.Router()
const NewJob = require("../models/NewJob")
/*
router.post("/createnewjobs",async(req,res)=>{
    
    console.log(req.file)
    res.json({success:true})
})*/
router.post("/createnewjobs",async(req,res)=>{
    try{
        await NewJob.create({
            name:req.body.name,
            email:req.body.email,
            CategoryName:req.body.CategoryName,
            address:req.body.address,
            contact:req.body.contact,
            role:req.body.role,
            description:req.body.description,
            img:req.file.path
        })
        res.json({success:true})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false})
    }
})

module.exports = router;