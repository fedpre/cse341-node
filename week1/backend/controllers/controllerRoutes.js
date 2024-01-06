const { findProfessionalByName } = require('../database/mongodb');

const helloWorldRoute = (req, res) => {
  res.send('Hello World!');
};
const professionalRoute = async (req, res) => {
  const professional = await findProfessionalByName('Federico Pregnolato');
  res.send(JSON.stringify(professional));
};

module.exports = {
  helloWorldRoute,
  professionalRoute,
};
