const express = require("express")
const router = express.Router()
const Admin = require("../models/Admin")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const {body,validationResult} = require("express-validator")
const jwtSecret = "MynameisEndtoEndYouTubeChannel$#"
router.post("/createadmin",[body('email').isEmail(),body('password').isLength({min: 5})],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)
    try{
        await Admin.create({
            name:req.body.name,
            email:req.body.email,
            password:secPassword,
            address:req.body.address,
            contact:req.body.contact
        })
        res.json({success:true})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false})
    }
})


router.post("/loginadmin",[body('email').isEmail(),body('password').isLength({min: 5})],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    let email = req.body.email;
    try{
        let admin = await Admin.findOne({email});
        if(!admin)
        {
            return res.status(400).json({errors:"Try loggin with correct email"});
        }
        const pwdcompare = await bcrypt.compare(req.body.password,admin.password)
        if(!pwdcompare)
        {
            return res.status(400).json({errors:"Try loggin with correct password"});
        }
        const data={
            admin:{
                id:admin._id
            }
        }
        const authToken= jwt.sign(data,jwtSecret)
        res.json({success:true,authToken:authToken})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false})
    }
})
module.exports = router;