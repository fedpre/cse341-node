const helloWorldRoute = (req, res) => {
  res.send('Hello World!');
};
const professionalRoute = (req, res) => {
  res.send('Professionals route');
};

module.exports = {
  helloWorldRoute,
  professionalRoute,
};
