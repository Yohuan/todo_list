const {
  handleCreateTodo,
  handleGetTodo,
  handleGetTodos,
  handleRemoveTodo,
  handleUpdateTodo,
} = require('./todo');

const apiControllers = {
  createTodo: handleCreateTodo,
  getTodo: handleGetTodo,
  getTodos: handleGetTodos,
  removeTodo: handleRemoveTodo,
  updateTodo: handleUpdateTodo,
};

module.exports = apiControllers;
