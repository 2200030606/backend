const EventManager =require('../models/EventManager')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const insertmanager =async(request,response)=>{
    try
    {
                 const input=request.body
                 const eventmanager=new EventManager.eventmanager(input)
                 await eventmanager.save()
                 response.send("Registered Succesfully")
    }
    catch(err)
    {
        response.status(500).send(err.message)
    }
}

const checkmanagerlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     console.log(input)
     const admin = await EventManager.eventmanager.findOne(input)
     response.json(admin)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };
 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './media/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // File naming convention //date.now to print the timestamp
  }
});

const upload = multer({ storage: storage }).single('file');

 const insertdetails =async(req,res)=>{
  try 
  {
    upload(req, res, async function (err) 
    {
      if (err) 
      {
        console.error(err);
        return res.status(500).send(err.message);
      }
      
      const { fullname,brandname,category,  description,cost,contact } = req.body;
      const fileName = req.file ? req.file.filename : undefined; // Extracting file name

      const newEvent = new EventManager.eventdetails({
        fullname,
        brandname,
        category,
        description,
        cost,
        contact,
        file: fileName // Save only the file name
      });



      await newEvent.save();
      res.status(200).send('Event Created Successfully');
    });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).send(error.message);
  }
};





  const managerlogin = async (request,response)=>
{
  try
  {
    const {email}=  request.params
    const managerdetails =await EventManager.eventmanager.findOne({email})
    if(managerdetails)
      {
        response.json(managerdetails)
      }
      else
      {
        response.send(" ID not found")
      }
  }
  catch(error)
  {
              response.send(500).send(error.message)
  }
}


const managerevents = async (request, response) => {
  try {
    const  contact = request.params.contact;
    // Assuming 'EventManager' is your model and 'eventdetails' is the collection/table name
    const events = await EventManager.eventdetails.find({contact});
    
    if (events && events.length > 0) {
      response.json(events);
    } else {
      response.status(404).send("Events not found for the given contact");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
}

const eventimage = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../media', filename);
  console.log(filepath)
  
    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream {binary data}
  


    if (ext === '.png') {
      contentType = 'image/png';
      } else if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg';
      } else if (ext === '.pdf') {
      contentType = 'application/pdf';
      } else if (ext === '.txt') {
      contentType = 'text/plain';
      }
      
        res.setHeader('Content-Type', contentType);
          res.send(data);
        })
      }
      





module.exports={insertmanager,checkmanagerlogin,insertdetails,managerlogin,managerevents,eventimage}