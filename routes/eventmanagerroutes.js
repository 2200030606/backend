const managercontroller =require('../controllers/eventmanagercontroller')

const express=require("express")
const managerrouter=express.Router()

managerrouter.post("/insertmanager",managercontroller.insertmanager)
managerrouter.post("/checkmanagerlogin",managercontroller.checkmanagerlogin)
managerrouter.post("/insertdetails",managercontroller.insertdetails)
managerrouter.get("/managerlogin/:email",managercontroller.managerlogin)
managerrouter.get("/managerevents/:contact",managercontroller.managerevents)
managerrouter.get("/eventimage/:filename",managercontroller.eventimage)

module.exports=managerrouter