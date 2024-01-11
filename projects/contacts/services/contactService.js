const { ObjectId } = require('mongodb');

async function getAllContacts(client) {
  try {
    const database = client.db('cse341api');
    const collection = database.collection('contacts');
    const contacts = await collection.find({}).toArray((err, result) => {
      if (err) throw err;
      return result;
    });
    return { contacts, err: null };
  } catch (err) {
    return { contact: null, err };
  }
}

async function getContactById(id, client) {
  try {
    const database = client.db('cse341api');
    const collection = database.collection('contacts');
    const contact = await collection.findOne({ _id: new ObjectId(id) });
    return { contact, err: null };
  } catch (err) {
    return { contact: null, err };
  }
}

async function addContact(contact, client) {
  try {
    const database = client.db('cse341api');
    const collection = database.collection('contacts');
    const result = await collection.insertOne(contact);
    return { result, err: null };
  } catch (err) {
    return { result: null, err };
  }
}

async function updateContactById(id, client, contact) {
  try {
    const database = client.db('cse341api');
    const collection = database.collection('contacts');
    const findContact = await collection.findOne({ _id: new ObjectId(id) });
    if (!findContact) {
      const resultAddContact = await collection.insertOne(contact);
      return resultAddContact;
    }
    const updatedResult = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          firstName: contact.firstName || findContact.firstName,
          lastName: contact.lastName || findContact.lastName,
          email: contact.email || findContact.email,
          favoriteColor: contact.favoriteColor || findContact.favoriteColor,
          birthday: contact.birthday || findContact.birthday,
        },
      }
    );
    return { updatedResult, err: null };
  } catch (err) {
    return { updateResult: null, err };
  }
}

async function deleteContactById(id, client) {
  try {
    const database = client.db('cse341api');
    const collection = database.collection('contacts');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return { result, err: null };
  } catch (err) {
    return { result: null, err };
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
};
