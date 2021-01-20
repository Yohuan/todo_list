const { todoInMemoryStorage } = require('@server/storage/todo');
const { createTodo } = require('@server/utils/todo');

module.exports = async (todoDescription) => {
  const todo = createTodo(todoDescription);
  await todoInMemoryStorage.saveTodo(todo);
  return todo.id;
};
