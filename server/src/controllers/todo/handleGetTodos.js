const TodoService = require('@server/services/todo');

const handleGetTodos = async (req, res, next) => {
  let todos;
  try {
    todos = await TodoService.getAllTodos();
  } catch (err) {
    // TODO: return response error
    next(err);
  }

  res.status(200).json(todos);
};

module.exports = handleGetTodos;
