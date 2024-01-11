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
  const { contacts, err } = await getAllContacts(client);
  if (err) {
    res.status(500).send({
      message: `Error: ${err}`,
    });
    return;
  }
  res.status(200).send(JSON.stringify(contacts));
};

const contactByIdRoute = async (req, res) => {
  const client = await getDbClient();
  const id = req.params.id;
  const { contact, err } = await getContactById(id, client);
  if (err) {
    res.status(500).send({
      message: `Error: ${err}`,
    });
    return;
  }
  if (!contact) {
    res.status(404).send({});
    return;
  }
  res.status(200).send(JSON.stringify(contact));
};

const addContactRoute = async (req, res) => {
  const client = await getDbClient();
  const contact = req.body;

  if (!contact) {
    res.status(400).send({
      message: 'Contact information is required!',
    });
    return;
  }

  try {
    const { result: addedContact, err } = await addContact(contact, client);
    if (err) {
      res.status(500).send({
        message: `Error: ${err}`,
      });
      return;
    }
    const contactId = addedContact.insertedId.toString();
    res.status(200).send({
      message: 'Contact added successfully! Contact id: ' + contactId,
    });
  } catch (err) {
    res.status(500).send({
      message: 'Error adding contact!',
    });
  }
};

const updateContactByIdRoute = async (req, res) => {
  const client = await getDbClient();
  const id = req.params.id;

  try {
    const { updatedResult, err } = await updateContactById(
      id,
      client,
      req.body
    );

    if (err) {
      res.status(500).send({
        message: `Error: ${err}`,
      });
      return;
    }

    if (updatedResult.modifiedCount === 0) {
      res.status(404).send({
        message: 'Contact not found!',
      });
      return;
    }

    res.status(200).send({
      message: 'Contact updated successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: 'Error updating contact!',
    });
  }
};

const deleteContactByIdRoute = async (req, res) => {
  const client = await getDbClient();
  const id = req.params.id;

  try {
    const { result, err } = await deleteContactById(id, client);

    if (err) {
      res.status(500).send({
        message: `Error: ${err}`,
      });
      return;
    }

    console.log(result);

    if (result.deletedCount === 0) {
      res.status(404).send({
        message: 'Contact not found!',
      });
      return;
    }

    res.status(200).send({
      message: 'Contact deleted successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: 'Error deleting contact!',
    });
  }
};

module.exports = {
  contactsRoute,
  contactByIdRoute,
  addContactRoute,
  updateContactByIdRoute,
  deleteContactByIdRoute,
};
