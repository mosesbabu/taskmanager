const express = require('express');
const sql = require('mssql');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'process.env.EMAIL_USER',
    pass: 'process.env.EMAIL_PASS'
  }
});

const dbConfig = {
  user: 'process.env.DB_USER' ,
  password: 'process.env.DB_PASS',
  server: 'localhost',
  database: 'process.env.DB_NAME',
    options: {
    encrypt: true, 
    trustServerCertificate: true,
    enableArithAbort: true,
    
  }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ error: 'Unauthorized' });

  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err) return res.status(403).send({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  // Validate user credentials basic authentication without database for mvp
  if (email === 'admin@taskmanager.com' && password === 'password') {
    const token = jwt.sign({ email }, 'SECRET_KEY', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send({ error: 'Invalid email or password' });
  }
});

app.post('/api/issues', authMiddleware, async (req, res) => {
  const { complainant, category, description, phoneNumber, assignee } = req.body;
  const trackingId = Math.floor(100000 + Math.random() * 900000); // generate a 6-digit tracking ID

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('complainant', sql.VarChar, complainant)
      .input('category', sql.VarChar, category)
      .input('description', sql.Text, description)
      .input('phoneNumber', sql.VarChar, phoneNumber)
      .input('assignee', sql.VarChar, assignee)
      .input('trackingId', sql.Int, trackingId)
      .query('INSERT INTO Issues (Complainant, Category, Description, PhoneNumber, Assignee, TrackingId, Status) VALUES (@complainant, @category, @description, @phoneNumber, @assignee, @trackingId, \'Pending\')');

    // Send email
    const mailOptions = {
      from: 'mosesarara@gmail.com',
      to: complainant,
      subject: 'Issue Submitted',
      text: `Your issue has been submitted. Tracking ID: ${trackingId}. Assigned to: ${assignee}.`
    };
    await transporter.sendMail(mailOptions);

    // Send SMS
    await twilioClient.messages.create({
      body: `Your issue has been submitted. Tracking ID: ${trackingId}. Assigned to: ${assignee}.`,
      from: 'process.env.TWILIO_PHONE_NUMBER',
      to: phoneNumber
    });

    res.status(201).send({ trackingId });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get('/api/issues', authMiddleware, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Issues');
    res.status(200).send(result.recordset);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.patch('/api/issues/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('status', sql.VarChar, status)
      .query('UPDATE Issues SET Status = @status WHERE ID = @id');

    res.status(200).send({ message: 'Issue status updated successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});