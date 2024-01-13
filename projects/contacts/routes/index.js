const {
  contactsRoute,
  contactByIdRoute,
  addContactRoute,
  updateContactByIdRoute,
  deleteContactByIdRoute,
} = require('../controllers/controllerRoutes');

const routes = require('express').Router();

routes.use('/', require('./swagger'));

routes.get('/contacts', contactsRoute);
routes.get('/contacts/:id', contactByIdRoute);
routes.post('/contacts', addContactRoute);
routes.put('/contacts/:id', updateContactByIdRoute);
routes.delete('/contacts/:id', deleteContactByIdRoute);

module.exports = routes;
