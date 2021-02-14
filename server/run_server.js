/* eslint-disable no-console */
require('module-alias/register');

const path = require('path');

const dotdev = require('dotenv');
const YAML = require('yamljs');

const { buildApp } = require('@server/utils/app');
const { createTodoInMemoryStorage, todoStorageRegistry } = require('@server/storage/todo');
const { getListeningPort } = require('@server/utils/endpoint');

const _OPENAPI_SPEC_FILE = path.join(__dirname, 'config/openapi.yml');

const envFile = path.join(process.cwd(), process.env.ENV_FILE);
dotdev.config({ path: envFile });

if (!process.env.PORT) {
  throw new Error('There is no specified port!');
}

const main = async () => {
  const todoInMemoryStorage = createTodoInMemoryStorage();
  todoStorageRegistry.register(todoInMemoryStorage);

  const apiSpec = YAML.load(_OPENAPI_SPEC_FILE);
  const port = getListeningPort();

  try {
    const app = await buildApp({
      apiSpec,
      isDev: process.env.NODE_ENV === 'development',
    });
    await app.listen(port);
    console.log(`Listening at port ${port}`);
  } catch (err) {
    console.error('Activate app failed');
  }
};

main();
