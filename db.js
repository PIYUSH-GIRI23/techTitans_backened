const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
const uri = process.env.mongoURI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected to database');
    
    const database = client.db('Hospital');
    const patients = database.collection('patients');
    const doctors = database.collection('doctors');
    const book = database.collection('book');
    const query = database.collection('query');
    
    // You can optionally return the collection here or any other objects you need.
    return {patients, doctors,book,query};
  } catch (err) {
    console.error('Error connecting to database:', err);
    throw err;
  }
}

module.exports = connectToDatabase;
