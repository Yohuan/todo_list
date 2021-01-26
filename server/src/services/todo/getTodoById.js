const { todoStorageRegistry } = require('@server/storage/todo');

module.exports = async todoId => {
  const todoStorage = todoStorageRegistry.getStorage();
  return todoStorage.getTodoById(todoId);
};
