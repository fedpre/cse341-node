const {
  contactsRoute,
  helloWorldRoute,
  contactByIdRoute,
} = require('../controllers/controllerRoutes');

const routes = require('express').Router();

routes.get('/', helloWorldRoute);
routes.get('/contacts', contactsRoute);
routes.get('/contacts/:id', contactByIdRoute);

module.exports = routes;