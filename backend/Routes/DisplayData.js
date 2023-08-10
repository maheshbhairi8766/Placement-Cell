const express = require("express")
const router = express.Router()

router.post("/displaydata",async(req,res)=>{
    try {
        res.send([global.job_Data,global.jobCategory])
    } catch (error) {
        console.log(error)
        res.send("server error")
    }
})
module.exports = router;