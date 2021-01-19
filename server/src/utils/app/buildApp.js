const SwaggerParser = require("@apidevtools/swagger-parser");
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { connector, summarise } = require('swagger-routes-express');

const apiControllers = require('@server/controllers');

const buildApp = async ({ apiSpec, isDev = false }) => {
  try {
    await SwaggerParser.validate(apiSpec);
  }
  catch (err) {
    const errorMsg = 'Invalid OpenAPI spec';
    // TODO: use logger
    console.error(errorMsg);
    throw new Error(errorMsg)
  }

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

  // serve OpenAPI document
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

  return app;
};

module.exports = buildApp;
