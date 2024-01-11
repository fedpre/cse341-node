const {
  contactsRoute,
  contactByIdRoute,
} = require('../controllers/controllerRoutes');

const routes = require('express').Router();

routes.get('/posts', contactsRoute);
routes.get('/posts/:id', contactByIdRoute);

module.exports = routes;
