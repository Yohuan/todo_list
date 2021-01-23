const createTodo = require('./createTodo');
const getAllTodos = require('./getAllTodos');
const getTodoById = require('./getTodoById');

const TodoService = {
  createTodo,
  getAllTodos,
  getTodoById,
};

module.exports = TodoService;
