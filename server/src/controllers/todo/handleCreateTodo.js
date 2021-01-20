const TodoService = require('@server/services/todo');

const handleCreateTodo = async (req, res, next) => {
  const { todoDescription } = req.body;

  let todoId;
  try {
    todoId = await TodoService.createTodo(todoDescription);
  } catch (err) {
    // TODO: return response error
    next(err);
  }

  // TODO: set Location header
  res.status(201).json({ todoId });
};

module.exports = handleCreateTodo;
