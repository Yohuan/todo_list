require('module-alias/register');

const path = require('path');

const YAML = require('yamljs');
const dotdev = require('dotenv');

const { buildApp } = require('@server/utils/app')

const envFile = path.join(process.cwd(), process.env.ENV_FILE);
dotdev.config({ path: envFile });

const _PORT = 5566;
const _OPENAPI_SPEC_FILE = path.join(__dirname, 'config/openapi.yaml');

const apiSpec = YAML.load(_OPENAPI_SPEC_FILE);

const main = async () => {
  const app = await buildApp({
    apiSpec,
    isDev: process.env.MODE === 'development'
  });
  await app.listen(_PORT);
  console.log(`Listening at port ${_PORT}`);
};

main();
