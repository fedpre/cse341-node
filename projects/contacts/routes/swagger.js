const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swawggerDocument = require('../swagger.json');
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swawggerDocument));

module.exports = router;
