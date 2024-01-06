const express = require('express');
const routes = require('./routes');
const app = express();

app.use('/', routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Web Server is listening on port ${PORT}!`));
