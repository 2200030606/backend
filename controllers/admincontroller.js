const Client = require("../models/Client")
const Admin =require("../models/Admin")
const EventManager=require("../models/EventManager")
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './media/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

 const viewclients = async (request, response) => 
 {
    try 
    {
      const client = await Client.find();
      if(client.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(client);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };


  const checkadminlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       
       const admin = await Admin.findOne(input)
       response.json(admin)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const viewmanagers = async (request, response) => 
 {
    try 
    {
      const client = await EventManager.eventmanager.find();
      if(client.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(client);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const deleteclient = async (request, response) => 
  {
     try 
     {
       const email = request.params.email
       const clientdetail = await Client.findOne({"email":email})
       if(clientdetail!=null)
       {
         await  Client.deleteOne({"email":email})
         response.send("Deleted Successfully")
       }
       else
       {
         response.send("Email ID Not Found")
       }
 
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const deletemanager = async (request, response) => 
  {
     try 
     {
       const email = request.params.email
       const managerdetail = await EventManager.eventmanager.findOne({"email":email})
       if(managerdetail!=null)
       {
         await  EventManager.eventmanager.deleteOne({"email":email})
         response.send("Deleted Successfully")
       }
       else
       {
         response.send("Email ID Not Found")
       }
 
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const changeadminpwd = async (request, response) => {
    try 
    {
      const { username, oldpassword, newpassword } = request.body;

      const admin = await Admin.findOne({ username, password: oldpassword });
      
       if (!admin) 
      {
        response.status(400).send('Invalid Old Password');
      }
      else
      {
          if(oldpassword==newpassword)
          {
            response.status(400).send('Both Passwords are Same');
          }
          else
          {
            await Admin.updateOne({username},{ $set: { password: newpassword } });
             response.json('Password Updated Successfully');
          }
        
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  const viewevents = async (request, response) => 
 {
    try 
    {
      const client = await EventManager.eventdetails.find();
      if(client.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(client);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const analysis = async (req, res) => {
    try 
    {
        const eventCount = await EventManager.eventdetails.countDocuments();
        const managerCount = await EventManager.eventmanager.countDocuments();
        const clientCount = await Client.countDocuments();
        res.json({eventCount,managerCount,clientCount});
    } 
    catch (error) 
    {
        res.status(500).send(error.message);
    }
  };



  module.exports={viewclients,checkadminlogin,viewmanagers,deleteclient,deletemanager,changeadminpwd,viewevents,analysis}