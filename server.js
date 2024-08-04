const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');


const path = require('path');
const cors = require('cors');
const url = 'mongodb://soundar:soundar123@localhost:27017';
const app = express();
const port = 5000;
const SECRET_KEY ='hopeRise123';
const { MongoClient, ObjectId } = require('mongodb');
const formidable = require('formidable');
const nodemailer = require('nodemailer');

const mongoUrl = 'mongodb://soundar:soundar123@localhost:27017'; // MongoDB connection URL
const dbName = 'doctorDB';
const doctorsCollectionName = 'doctors';
const appointmentsCollectionName = 'appointments';
app.use(cors());
app.use(bodyParser.json());

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { userType, name, email, password, ...rest } = req.body;
  const client = new MongoClient(url);
  try {
    
    console.log("Connection requested");
    
    await client.connect();
    
    console.log("Connected successfully to server");
    const db = client.db(dbName);
     
    const collection = userType === 'doctor' ? 'doctors' : 'patients';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { name:name, email:email, password: hashedPassword, ...rest };
    const result = await db.collection('doctors').insertOne(user);
    console.log("saved data");
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send('Error creating user');
  }
  finally{
  await client.close();
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  const client = new MongoClient(mongoUrl);
  try {
    console.log("called");
     await client.connect();
     console.log("Connected to db");
     const db=client.db(dbName);
    const doctor = await db.collection('doctors').findOne({ email });
    const patient = await db.collection('patients').findOne({ email });
    const user = doctor || patient;
    console.log(user);
    
    if (!user) return res.status(400).send('User not found');
    
    const isMatch = password==user.password;
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, SECRET_KEY);
    res.json({ token ,user: { name: user.name, email: user.email, type: doctor ? 'doctor' : 'patient', ...user } });
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../reactlearning/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// MongoDB connection


app.get("/",async(req,res)=>{
      const client = new MongoClient(url);
    await client.connect();
    
        console.log("Connected successfully to server");
      res.status(200).send("Super");
      
    
       
      const db = client.db(dbName);
      const collection = db.collection('doctor');
})
app.post('/api/doctor/signup', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'license', maxCount: 1 }
]), async (req, res) => {
    const client = new MongoClient(mongoUrl);

    try {
        await client.connect();
            
            console.log("Connected successfully to server");
          
            const db = client.db(dbName);
          const collection = db.collection('doctors');
          
        
        
        

        const doctorInfo = {
            name: req.body.name,
            specialization: req.body.specialization,
            experience: parseInt(req.body.experience),
            address: req.body.address,
            contactnumber: req.body.phone,
            email: req.body.email,
            city:req.body.city,
            profilePhoto: "/uploads/"+req.files['photo'][0].filename,
            license: "/uploads/"+req.files['license'][0].filename,
            password:req.body.password
        };

        await collection.insertOne(doctorInfo);
        res.status(200).send('Form submitted successfully');
    } catch (error) {
        console.error('Error:', error);
        console.log(error)
        res.status(500).send('An error occurred while submitting the form');
    } finally {
        await client.close();
    }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function getDoctorEmailById(doctorId) {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const doctorsCollection = db.collection(doctorsCollectionName);

        // Find the doctor by their ObjectId
        const doctor = await doctorsCollection.findOne({ _id: new ObjectId(doctorId)});

        if (!doctor) {
            throw new Error('Doctor not found');
        }

        return doctor.email;
    } catch (error) {
        console.error('Error fetching doctor email:', error);
        throw error;
    } finally {
        // Close MongoDB connection
        await client.close();
    }
}



// Function to connect to MongoDB and search for doctors
async function searchDoctors(query) {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const doctorsCollection = db.collection(doctorsCollectionName);

        // Query MongoDB for doctors matching the query
        const regex = new RegExp(query, 'i'); // Case-insensitive search
        const queryObj = {
            $or: [
                { name: regex },
                { specialization: regex },
                { establishmentName: regex },
                { city: regex }
            ]
        };

        const doctors = await doctorsCollection.find(queryObj).toArray();

        // Ensure there's a timings field for each doctor and email field
        return doctors.map(doctor => ({
            ...doctor,
            timings: doctor.timings || [], // Ensure there's a timings field
            email: doctor.email || '' // Ensure there's an email field
        }));
    } catch (error) {
        console.error('Error connecting to MongoDB or querying data:', error);
        throw error;
    } finally {
        // Close MongoDB connection
        await client.close();
    }
}

// Function to book appointment
async function bookAppointment(data) {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const appointmentsCollection = db.collection(appointmentsCollectionName);

        // Insert appointment data into MongoDB
        const result = await appointmentsCollection.insertOne(data);
        console.log(`New appointment added with ID: ${result.insertedId}`);
    } catch (error) {
        console.error('Error inserting appointment into MongoDB:', error);
        throw error;
    } finally {
        // Close MongoDB connection
        await client.close();
    }
}

// Serve HTML file for the root route


// Handle search for doctors by query
app.get('/search', async (req, res) => {
    const query = req.query.query;
console.log("called");
    try {
        const doctors = await searchDoctors(query);

        // Send JSON response with doctors data
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).send('Error fetching doctors');
    }
});
let docid;

// Handle appointment booking
app.post('/book-appointment', (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields) => {
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).send('Error parsing form data');
            return;
        }
        let uemail=fields.email;
        let docname=fields.doctorName;
        docid=fields.doctorId;
        const appointmentData = {
            doctorId: fields.doctorId,
            doctorName: fields.doctorName,
            establishmentName: fields.establishmentName,
            userName: fields.name,
            phoneNumber: fields.phoneNumber,
            email: fields.email,
            reason: fields.reason,
            timing: fields.timing,
            doctorEmail: fields.doctorEmail // Ensure this field is included
        };

        try {
            //await bookAppointment(appointmentData);
            await bookAppointment(appointmentData);

            // Get the doctor's email by their ID
        
            

            // Send confirmation email to the doctor
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'praveenkumartv@student.tce.edu',
                    pass: 'ilsm zxdk duti lhcg'
                }
            });

            const mailOptions = {
                from: 'praveenkumartv@student.tce.edu',
                to: uemail, // Use doctor's email here
                subject: 'New Appointment Booking',
                text: `Your appoinment registration is successful. Username: ${appointmentData.userName}. Reason: ${appointmentData.reason}, Timing: ${appointmentData.timing}.`
            };
        

           

            

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }

                
            });

            
            

                
          

            res.status(200).send('Appointment booked successfully');
        } catch (error) {
            console.error('Error booking appointment:', error);
            res.status(500).send('Error booking appointment');
        }
    });
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});