const TodoService = require('@server/services/todo');
const { TodoErrorCode } = require('@server/constants/error');

const handleCreateTodo = async (req, res) => {
  const { todoDescription } = req.body;

  let todoId;
  try {
    todoId = await TodoService.createTodo(todoDescription);
  } catch (err) {
    res.status(500).json({
      code: TodoErrorCode.CREATION_ERROR,
      message: 'Cannot create a todo.',
    });
  }

  // TODO: set Location header
  res.status(201).json({ todoId });
};

module.exports = handleCreateTodo;
