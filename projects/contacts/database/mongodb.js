require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = process.env.MONGODB_URI;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dd4wusz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function runDbConnection() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

function getDbClient() {
  if (!client.isConnected()) {
    throw new Error('Client is not connected');
  } else {
    return client;
  }
}

async function getAllContacts() {
  try {
    await client.connect();
    const database = client.db('cse341api');
    const collection = database.collection('contacts');
    const contacts = await collection.find({}).toArray((err, result) => {
      if (err) throw err;
      return result;
    });
    return contacts;
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(id) {
  try {
    await client.connect();
    const database = client.db('cse341api');
    const collection = database.collection('contacts');
    const contact = await collection.findOne({ _id: new ObjectId(id) });
    return contact;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  runDbConnection,
  getAllContacts,
  getDbClient,
  getContactById,
};
