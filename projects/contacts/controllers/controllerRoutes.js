const { getDbClient } = require('../database/mongodb');
const {
  getAllContacts,
  getContactById,
} = require('../services/ContactService');

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

module.exports = {
  contactsRoute,
  contactByIdRoute,
};
