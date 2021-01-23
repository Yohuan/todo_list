const {
  handleCreateTodo,
  handleGetTodo,
  handleGetTodos,
} = require('./todo');

const apiControllers = {
  createTodo: handleCreateTodo,
  getTodo: handleGetTodo,
  getTodos: handleGetTodos,
};

module.exports = apiControllers;
