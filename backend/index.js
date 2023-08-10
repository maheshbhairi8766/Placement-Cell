const express = require('express')
const app = express()
const port = 5000
const mongoDB=require('./db')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const uploadresume = multer({dest: 'uploadsResume/'})
mongoDB();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept'
    );
    next();
})

app.use(express.json())
app.use('/uploads',express.static('uploads'))












app.use('/api',upload.single('img'),require("./Routes/NewJobsList"))
app.use('/api',uploadresume.single('resume'),require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/AppliedUser"))
app.use('/api',require("./Routes/CreateAdmin"))
app.use('/api',require("./Routes/AdminProfile"))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})