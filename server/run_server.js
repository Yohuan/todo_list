require('module-alias/register');

const path = require('path');

const YAML = require('yamljs');

const { buildApp } = require('@server/utils/app')

const _PORT = 5566;
const _OPENAPI_SPEC_FILE = path.join(__dirname, 'config/openapi.yaml');

const apiSpec = YAML.load(_OPENAPI_SPEC_FILE);

buildApp(apiSpec)
  .then(app => {
    app.listen(_PORT, () => {
      console.log(`Listening at http://localhost:${_PORT}`);
    });
  });

