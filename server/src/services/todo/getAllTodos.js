const { todoStorageRegistry } = require('@server/storage/todo');

module.exports = async () => {
  const todoStorage = todoStorageRegistry.getStorage();
  return todoStorage.getAllTodos();
};
