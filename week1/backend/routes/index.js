const routes = require('express').Router();
const controllers = require('../controllers/controllerRoutes');

routes.get('/', controllers.helloWorldRoute);
routes.get('/professional', controllers.professionalRoute);

module.exports = routes;
