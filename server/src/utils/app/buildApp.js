const { connector, summarise } = require('swagger-routes-express');

const express = require('express');

const apiControllers = require('@server/controllers');

const buildApp = async ({ apiSpec, isDev = false }) => {
  if (isDev) {
    const apiSummary = summarise(apiSpec);
    // TODO: use logger
    console.log(apiSummary);
  }

  const app = express();

  // TODO: add security option
  // TODO: customize "notFound"
  // TODO: customize "notImplemented"
  const connect = connector(apiControllers, apiSpec);
  connect(app);

  return app;
};

module.exports = buildApp;
