const mongoose = require('mongoose');

const mongoURI='mongodb://maheshbhairi8766:8766@ac-2fyupih-shard-00-00.rrtzybo.mongodb.net:27017,ac-2fyupih-shard-00-01.rrtzybo.mongodb.net:27017,ac-2fyupih-shard-00-02.rrtzybo.mongodb.net:27017/placementcellmern?ssl=true&replicaSet=atlas-ut9dgu-shard-0&authSource=admin&retryWrites=true&w=majority'

const mongoDB=async()=>{
    await mongoose.connect(mongoURI, async(err,result)=>{
        if(err)
            console.log("---",err)
        else
        {
             console.log("connected");
             const fetched_data = await mongoose.connection.db.collection("job_datas");
             fetched_data.find({}).toArray(async function(err,data){
                const fetch_data =  await mongoose.connection.db.collection("jobCategory")
                fetch_data.find({}).toArray(function (err,catdata){
                    if(err)
                    console.log(err)
                    else
                    {
                        global.job_Data=data
                        global.jobCategory=catdata
                        console.log()
                    }
                })
                
             })

             
        }
    });
}
module.exports=mongoDB; 