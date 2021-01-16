const { connector, summarise } = require('swagger-routes-express');

const express = require('express');

const buildApp = async (apiSpec) => {
  const apiSummary = summarise(apiSpec);
  // TODO: use logger
  console.log(apiSummary);

  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  return app;
};

module.exports = buildApp;
