const { todoStorageRegistry } = require('@server/storage/todo');

module.exports = async (todoId, { description, isCompleted }) => {
  const todoStorage = todoStorageRegistry.getStorage();
  await todoStorage.updateTodoById(todoId, {
    description,
    isCompleted,
  });
};
