const { MongoClient, ServerApiVersion } = require('mongodb');
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

    const databaseList = await client.db().admin().listDatabases();
    console.log('Your databases:' + JSON.stringify(databaseList));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

module.exports = runDbConnection;
