const clientcontroller =require('../controllers/clientcontroller')

const express=require("express")
const clientrouter=express.Router()

clientrouter.post("/insertclient",clientcontroller.insertclient)
clientrouter.post("/checkclientlogin",clientcontroller.checkclientlogin)
clientrouter.get("/clientlogin/:email",clientcontroller.clientlogin)
clientrouter.get("/clientevents/:category",clientcontroller.clientevents)
clientrouter.get("/clienteventimage/:filename",clientcontroller.clienteventimage)
clientrouter.get("/clienteventsinfo/:eventid",clientcontroller.clienteventsinfo)

clientrouter.put("/updateclientprofile",clientcontroller.updateclientprofile)
clientrouter.get("/clientprofile/:email",clientcontroller.clientprofile)
clientrouter.post("/bookevents",clientcontroller.bookevent)

module.exports=clientrouter