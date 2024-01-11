const { ObjectId } = require('mongodb');

async function getAllContacts(client) {
  try {
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

async function getContactById(id, client) {
  try {
    const database = client.db('cse341api');
    const collection = database.collection('contacts');
    const contact = await collection.findOne({ _id: new ObjectId(id) });
    return contact;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllContacts,
  getContactById,
};
