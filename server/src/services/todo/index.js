const createTodo = require('./createTodo');
const getAllTodos = require('./getAllTodos');

const TodoService = {
  createTodo,
  getAllTodos,
};

module.exports = TodoService;
