const Client=require('../models/Client')
const Booked =require('../models/EventsBooked')
const nodemailer = require('nodemailer');
const EventManager =require('../models/EventManager')
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


const upload = multer({ storage: storage }).single('file');

const insertclient =async(request,response)=>{
    try
    {
                 const input=request.body
                 const client=new Client(input)
                 await client.save()
                 response.send("Registered Succesfully")
    }
    catch(err)
    {
        response.status(500).send(err.message)
    }
}

const checkclientlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const client = await Client.findOne(input)
       response.json(client)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };


const clientlogin = async (request,response)=>
{
  try
  {
    const {email}=  request.params
    const clientdetails =await Client.findOne({email})
console.log('Client details:', clientdetails);
    if(clientdetails)
      {
        response.json(clientdetails)
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

const clientevents = async (request, response) => {
  try {
    let  category = request.params.category;
    console.log(category)
    
    // Assuming 'EventManager' is your model and 'eventdetails' is the collection/table name
   // const events = await EventManager.eventdetails.find({category});
   // console.log(events)
   //const events = await EventManager.eventdetails.find({ category: { $in: [category] } });
   const events = await EventManager.eventdetails.find({ category: category });

    if (events && events.length > 0) {
      response.json(events);
    } else {
      response.status(404).send("Events not found for the given category");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
}
const clienteventsinfo = async (request, response) => {
  try {
    
    let  s =  request.params.eventid;
    let eventid=parseInt(s)
   const events = await EventManager.eventdetails.find({ eventid:eventid });

    if (events && events.length > 0) {
      response.json(events);
    } else {
      response.status(404).send("Events not found for the given category");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
}
const clienteventimage = async (req, res) => 
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

const clientprofileimage = async(req,res)=>{
    const file=req.file;

}
      



const updateclientprofile = async (request, response) => 
{
  try 
  {
    const input = request.body;
    const email = input.email; 
    const client = await Client.findOne({ email });
    if (!client) 
    {
      response.status(200).send('Client not found with the provided email id');
    }
    for (const key in input) 
    {
      if (key !== 'email' && input[key]) {
        client[key] = input[key];
      }
    }
    await client.save();
    response.status(200).send('Client Profile Updated Successfully');
  } 
  catch (e) 
  {
    response.status(500).send(e.message);
  }
};


const clientprofile = async (request, response) => 
{
   try 
   {
     const email = request.params.email
     const clients = await Client.findOne({email})
     if(clients)
     {
       response.json(clients)
     }
     else
     {
       return response.status(200).send('Client not found with the provided email id');
     }
     
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };


 
   const bookevent = async (request, response) => {
     try 
     {
       const input = request.body;
       const book = new Booked(input);
       await book.save();
       response.status(200).send('Booked Event Successfully');
       const gmailTransporter = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
             user: 'tellakulavarshitha@gmail.com', //gmail id
             pass: 'faat dvue hhcj wazb'  // app password
         }
     });
     
     
     const mailOptions = {
       from: 'tellakulavarshitha@gmail.com',
       to: book.email, // Change this line
       subject: 'Booked Events acceptance',
       html: `<font color="green">Hello ${book.fullname}</font>` // Change this line
     };
     
     
     gmailTransporter.sendMail(mailOptions, function(error, info) {
         if (error) {
             console.error('Error sending email through Gmail:', error.message);
         } else {
             console.log('Email Sent Successfully');
         }
     });
 
     } 
     catch(e) 
     {
       response.status(500).send(e.message);
     }
   };


module.exports={insertclient,checkclientlogin,clientlogin,clientevents,clienteventimage,clienteventsinfo,updateclientprofile,clientprofile,bookevent}