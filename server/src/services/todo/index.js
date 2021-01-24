const createTodo = require('./createTodo');
const getAllTodos = require('./getAllTodos');
const getTodoById = require('./getTodoById');
const removeTodoById = require('./removeTodoById');

const TodoService = {
  createTodo,
  getAllTodos,
  getTodoById,
  removeTodoById,
};

module.exports = TodoService;
