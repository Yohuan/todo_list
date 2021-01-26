const { createTodo } = require('@server/utils/todo');
const { todoStorageRegistry } = require('@server/storage/todo');

module.exports = async todoDescription => {
  const todo = createTodo(todoDescription);
  const todoStorage = todoStorageRegistry.getStorage();
  await todoStorage.saveTodo(todo);
  return todo.id;
};
