const express = require('express');
const OpenApiValidator = require('express-openapi-validator');
const SwaggerParser = require('@apidevtools/swagger-parser');
const swaggerUi = require('swagger-ui-express');
const { connector, summarise } = require('swagger-routes-express');

const apiControllers = require('@server/controllers');

const buildApp = async ({ apiSpec, isDev = false }) => {
  try {
    await SwaggerParser.validate(apiSpec);
  } catch (err) {
    const errorMsg = 'Invalid OpenAPI spec';
    // TODO: use logger
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  if (isDev) {
    const apiSummary = summarise(apiSpec);
    // TODO: use logger
    console.log(apiSummary);
  }

  const app = express();

  // TODO: refactor as app.use('/api', apiRouter);
  app.use('/api', express.json());
  // TODO: use gzip compression
  // ex: app.use(compression());

  // TODO: validate security
  app.use(
    OpenApiValidator.middleware({
      apiSpec,
      validateRequests: true,
      validateResponses: {
        onError: (error, body) => {
          // TODO: log the error
          console.log('Response body fails validation: ', error);
          console.debug(body);
        },
      },
    }),
  );

  // TODO: add security option
  // TODO: customize "notFound"
  // TODO: customize "notImplemented"
  const connect = connector(apiControllers, apiSpec);
  connect(app);

  // serve OpenAPI document
  app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

  // TODO: add customized error handling middleware
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });

  return app;
};

module.exports = buildApp;
