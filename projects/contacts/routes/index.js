const {
  contactsRoute,
  contactByIdRoute,
  addContactRoute,
  updateContactByIdRoute,
  deleteContactByIdRoute,
} = require('../controllers/controllerRoutes');

const routes = require('express').Router();

routes.get('/', contactsRoute);
routes.get('/:id', contactByIdRoute);
routes.post('/', addContactRoute);
routes.put('/:id', updateContactByIdRoute);
routes.delete('/:id', deleteContactByIdRoute);

module.exports = routes;
