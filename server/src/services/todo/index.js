const createTodo = require('./createTodo');
const getAllTodos = require('./getAllTodos');
const getTodoById = require('./getTodoById');
const removeTodoById = require('./removeTodoById');
const updateTodoById = require('./updateTodoById');

const TodoService = {
  createTodo,
  getAllTodos,
  getTodoById,
  removeTodoById,
  updateTodoById,
};

module.exports = TodoService;
