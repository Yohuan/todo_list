const { todoStorageRegistry } = require('@server/storage/todo');

module.exports = async todoId => {
  const todoStorage = todoStorageRegistry.getStorage();
  await todoStorage.deleteTodoById(todoId);
};
