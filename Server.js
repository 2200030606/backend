const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const dburl="mongodb://localhost:27017/EMS"
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



const port=1011
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})