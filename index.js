const express= require('express');
const dotenv= require('dotenv');
const Email= require('./Email')

dotenv.config();

const app= express();
app.get('/', async (req,res,next)=>{
    try{
        await new Email().sendMail()
        res.status(200).json({
            status:"success",
            message:"Welcome to the zuri email notification."
        })
    }catch(err){
        console.log(err)
        next(err)
    }
    
})

app.use((err,req,res,next)=>{
    let message="Error occured.";
    let statusCode=err.status || 500
    res.status(statusCode).json({
        status:"error",
        message
    })
})
app.listen(6000,()=>{
    console.log("server running at port 6000")
})