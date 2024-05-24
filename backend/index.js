const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(express.json());

const config = {
  user: 'moses' ,
  password: 'software112',
  server: 'localhost',
  database: 'taskmanager',
};

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
  // Validate user credentials (simplified for demonstration)
  if (email === 'admin@taskmanager.com' && password === 'password') {
    const token = jwt.sign({ email }, 'SECRET_KEY', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send({ error: 'Invalid email or password' });
  }
});

sql.connect(config, (err) => {
  if (err) console.log(err);
  else console.log('Connected to SQL Server');
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});