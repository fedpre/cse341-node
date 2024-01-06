const {
  contactsRoute,
  contactByIdRoute,
} = require('../controllers/controllerRoutes');

const routes = require('express').Router();

routes.get('/', contactsRoute);
routes.get('/:id', contactByIdRoute);

module.exports = routes;
