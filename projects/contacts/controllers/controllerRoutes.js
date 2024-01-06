const { getAllContacts } = require('../database/mongodb');

const helloWorldRoute = (req, res) => {
  res.send('Hello World!');
};

const contactsRoute = async (req, res) => {
  const contacts = await getAllContacts();
  res.send(JSON.stringify(contacts));
};

const contactByIdRoute = (req, res) => {
  const id = req.params.id;
  console.log('id: ', id);
};

module.exports = {
  helloWorldRoute,
  contactsRoute,
  contactByIdRoute,
};
