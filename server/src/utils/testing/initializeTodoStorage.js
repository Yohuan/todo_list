const { createTodoInMemoryStorage, todoStorageRegistry } = require('@server/storage/todo');
const { resetForTesting } = require('@server/storage/todo/storageRegistry');

module.exports = initialTodos => {
  resetForTesting();
  const todoInMemoryStorage = createTodoInMemoryStorage(initialTodos);
  todoStorageRegistry.register(todoInMemoryStorage);
};
