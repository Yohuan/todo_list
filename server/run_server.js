require('module-alias/register');

const path = require('path');

const dotdev = require('dotenv');
const YAML = require('yamljs');

const { buildApp } = require('@server/utils/app');
const { createTodoInMemoryStorage, todoStorageRegistry } = require('@server/storage/todo');

const envFile = path.join(process.cwd(), process.env.ENV_FILE);
dotdev.config({ path: envFile });

// TODO: put port as env variable
const _PORT = 5566;
const _OPENAPI_SPEC_FILE = path.join(__dirname, 'config/openapi.yaml');

const todoInMemoryStorage = createTodoInMemoryStorage();
todoStorageRegistry.register(todoInMemoryStorage);

const main = async () => {
  let app = null;
  try {
    const apiSpec = YAML.load(_OPENAPI_SPEC_FILE);
    app = await buildApp({
      apiSpec,
      // TODO: rename "MODE" as "NODE_ENV"
      isDev: process.env.MODE === 'development',
    });
  } catch (err) {
    console.error('Build app failed');
    return;
  }
  await app.listen(_PORT);
  console.log(`Listening at port ${_PORT}`);
};

main();
