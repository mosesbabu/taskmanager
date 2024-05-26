const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mosesarara:software112@cluster0.ch77qlb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
});

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db();
  } catch (err) {
    console.error('Database Connection Failed!', err);
    throw err;
  }
}

module.exports = {
  connectDB,
  client,
};
