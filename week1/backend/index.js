require('dotenv').config();
const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const { runDbConnection } = require('./database/mongodb');
const app = express();

runDbConnection();

app.use(cors());
app.use('/', routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Web Server is listening on port ${PORT}!`));
