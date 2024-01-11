const { getDbClient } = require('../database/mongodb');
const { updateContactById } = require('../services/contactService');
const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
} = require('../services/contactService');

const contactsRoute = async (req, res) => {
  const client = await getDbClient();
  const contacts = await getAllContacts(client);
  res.status(200).send(JSON.stringify(contacts));
};

const contactByIdRoute = async (req, res) => {
  const client = await getDbClient();
  const id = req.params.id;
  const contact = await getContactById(id, client);
  if (!contact) {
    res.status(404).send({});
    return;
  }
  res.status(200).send(JSON.stringify(contact));
};

const addContactRoute = async (req, res) => {
  const client = await getDbClient();
  const contact = req.body;
  const addedContact = await addContact(contact, client);
  const contactId = addedContact.insertedId.toString();
  res.status(200).send({
    message: 'Contact added successfully! Contact id: ' + contactId,
  });
};

const updateContactByIdRoute = async (req, res) => {
  const client = await getDbClient();
  const id = req.params.id;
  await updateContactById(id, client, req.body);

  res.status(200).send({
    message: 'Contact updated successfully!',
  });
};

const deleteContactByIdRoute = async (req, res) => {
  const client = await getDbClient();
  const id = req.params.id;
  await deleteContactById(id, client);

  res.status(200).send({
    message: 'Contact deleted successfully!',
  });
};

module.exports = {
  contactsRoute,
  contactByIdRoute,
  addContactRoute,
  updateContactByIdRoute,
  deleteContactByIdRoute,
};
