const { handleGetTodos } = require('./todo');

const apiControllers = {
  getTodos: handleGetTodos,
};

module.exports = apiControllers;
