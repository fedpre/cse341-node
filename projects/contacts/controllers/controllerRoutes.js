const { getAllContacts, getContactById } = require('../database/mongodb');

const contactsRoute = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).send(JSON.stringify(contacts));
};

const contactByIdRoute = async (req, res) => {
  const id = req.params.id;
  const contact = await getContactById(id);
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
