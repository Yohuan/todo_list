require('module-alias/register');

const path = require('path');

const dotdev = require('dotenv');
const YAML = require('yamljs');

const { buildApp } = require('@server/utils/app');
const { createTodoInMemoryStorage, todoStorageRegistry } = require('@server/storage/todo');
const { getListeningPort } = require('@server/utils/endpoint');

const envFile = path.join(process.cwd(), process.env.ENV_FILE);
dotdev.config({ path: envFile });

if (!process.env.PORT) {
  throw new Error('There is no specified port!');
}

const _OPENAPI_SPEC_FILE = path.join(__dirname, 'config/openapi.yml');

const todoInMemoryStorage = createTodoInMemoryStorage();
todoStorageRegistry.register(todoInMemoryStorage);

const main = async () => {
  let app = null;
  try {
    const apiSpec = YAML.load(_OPENAPI_SPEC_FILE);
    app = await buildApp({
      apiSpec,
      isDev: process.env.NODE_ENV === 'development',
    });
  } catch (err) {
    console.error('Build app failed');
    return;
  }
  const port = getListeningPort();
  await app.listen(port);
  console.log(`Listening at port ${port}`);
};

main();
