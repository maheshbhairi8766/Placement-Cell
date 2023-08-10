const express = require("express")
const router = express.Router()
const Applied = require("../models/Applied")
const AppliedByName = require("../models/AppliedByName")
router.post("/applieduser",async(req,res)=>{
    let data = req.body.job_data
    data.applied_date = req.body.applied_date;
    //await data.splice(0,0,{applied_date:req.body.applied_date})
    let eId= await Applied.findOne({'email':req.body.email})
    console.log(eId)
    if(eId === null)
    {
        try {
            await Applied.create({
                email:req.body.email,
                job_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            console.log(error)
            res.send("server error")    
        }
    }
    else
    {
        try {
            await Applied.findOneAndUpdate({email:req.body.email},
                {$push :{job_data:data}}).then(()=>{
                    res.json({success:true})
                })
        } catch (error) {
            res.send("server error",error.message)        
        }
    }    
})


router.post("/applybyname",async(req,res)=>{
    let data = req.body.job_data
    let date = req.body.applied_date;
    //await data.splice(0,0,{applied_date:req.body.applied_date})
    let eId= await AppliedByName.findOne({'name':req.body.name})
    console.log(eId)
    if(eId === null)
    {
        try {
            await AppliedByName.create({
                name:req.body.name,
                jobemail:req.body.email
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            console.log(error)
            res.send("server error")    
        }
    }
    else
    {
        try {
            await AppliedByName.findOneAndUpdate({name:req.body.name},
                {$push :{ jobemail:req.body.email}}).then(()=>{
                    res.json({success:true})
                })
        } catch (error) {
            res.send("server error",error.message)        
        }
    }    
})





router.post("/myapplieddata",async(req,res)=>{
        try {
            let mydata = await Applied.findOne({'email':req.body.email})
            res.json({appliedData:mydata})
        } catch (error){
            res.send("server error",error.message)
        }
})
module.exports = router;