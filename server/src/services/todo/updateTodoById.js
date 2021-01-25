const { todoInMemoryStorage } = require('@server/storage/todo');

module.exports = async (todoId, { description, isCompleted }) => {
  await todoInMemoryStorage.updateTodoById(todoId, {
    description,
    isCompleted,
  });
};
