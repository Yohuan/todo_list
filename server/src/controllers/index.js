const {
  handleCreateTodo,
  handleGetTodo,
  handleGetTodos,
  handleRemoveTodo,
} = require('./todo');

const apiControllers = {
  createTodo: handleCreateTodo,
  getTodo: handleGetTodo,
  getTodos: handleGetTodos,
  removeTodo: handleRemoveTodo,
};

module.exports = apiControllers;
