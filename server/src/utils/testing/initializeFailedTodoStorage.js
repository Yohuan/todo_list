const { resetForTesting } = require('@server/storage/todo/storageRegistry');
const { todoStorageRegistry } = require('@server/storage/todo');

module.exports = () => {
  resetForTesting();
  const failedTodoStorage = null; // any operation on this storage will fail
  todoStorageRegistry.register(failedTodoStorage);
};
