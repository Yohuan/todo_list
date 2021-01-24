const { todoInMemoryStorage } = require('@server/storage/todo');

module.exports = async (todoId, { description, isCompleted }) => todoInMemoryStorage.updateTodoById(todoId, {
  description,
  isCompleted,
});
