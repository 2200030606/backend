const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
require('dotenv').config();


const dburl = process.env.mongodburl 
mongoose.connect(dburl).then(() => {
    console.log("Connected to DB Successfully")
}).catch((err) => {
    console.log(err.message)
});



const app=express()
app.use(express.json()) //to parse JSON data

app.use(cors())

const adminrouter =require("./routes/adminroutes")
const clientrouter=require("./routes/clientroutes")
const managerrouter=require("./routes/eventmanagerroutes")

app.use("",adminrouter) //it includes admin route
app.use("",clientrouter) //it includes client route  
app.use("",managerrouter)


const port = process.env.PORT  || 1011 // if PORT is not found defaultly it takes 2032
app.listen(port,()=>{
    console.log(`Server is running at port:${port}`)
})