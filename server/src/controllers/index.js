const {
  handleCreateTodo,
  handleGetTodos,
} = require('./todo');

const apiControllers = {
  createTodo: handleCreateTodo,
  getTodos: handleGetTodos,
};

module.exports = apiControllers;
