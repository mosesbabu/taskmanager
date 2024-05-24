const express = require('express');
const sql = require('mssql');
//const dotenv = require('dotenv');

//dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const config = {
  user: moses ,
  password: software112,
  server: localhost,
  database: taskmanager,
};

sql.connect(config, (err) => {
  if (err) console.log(err);
  else console.log('Connected to SQL Server');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
