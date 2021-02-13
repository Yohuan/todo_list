const TodoService = require('@server/services/todo');
const { addObjectAttribute } = require('@server/utils/control');
const { generateTodoUrl } = require('@server/utils/todo');
const { HttpHeader } = require('@server/constants/http');
const { Object } = require('@server/constants/resource');
const { StatusCode } = require('@server/constants/http');
const { TodoErrorCode } = require('@server/constants/error');

const handleCreateTodo = async (req, res) => {
  const { todoDescription } = req.body;

  let todoId;
  let todo;
  try {
    todoId = await TodoService.createTodo(todoDescription);
    todo = await TodoService.getTodoById(todoId);
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR_500).json({
      code: TodoErrorCode.CREATION_ERROR,
      message: 'Cannot create a todo.',
    });

    return;
  }

  res.set(HttpHeader.LOCATION, generateTodoUrl(todoId));
  res.status(StatusCode.CREATED_201).json(addObjectAttribute(Object.TODO)(todo));
};

module.exports = handleCreateTodo;
