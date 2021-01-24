const TodoService = require('@server/services/todo');
const { StatusCode } = require('@server/constants/http');
const { TodoErrorCode } = require('@server/constants/error');
const { HttpHeader } = require('@server/constants/http');
const { generateTodoUrl } = require('@server/utils/todo');

const handleCreateTodo = async (req, res) => {
  const { todoDescription } = req.body;

  let todoId;
  try {
    todoId = await TodoService.createTodo(todoDescription);
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR_500).json({
      code: TodoErrorCode.CREATION_ERROR,
      message: 'Cannot create a todo.',
    });
  }

  res.set(HttpHeader.LOCATION, generateTodoUrl(todoId));
  res.status(StatusCode.CREATED_201).json({ todoId });
};

module.exports = handleCreateTodo;
