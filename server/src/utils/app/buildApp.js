const express = require('express');

const buildApp = async () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  return app;
};

module.exports = buildApp;
