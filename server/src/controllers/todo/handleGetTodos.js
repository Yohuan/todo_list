const TodoService = require('@server/services/todo');
const { StatusCode } = require('@server/constants/http');
const { TodoErrorCode } = require('@server/constants/error');

const handleGetTodos = async (req, res) => {
  let todos;
  try {
    todos = await TodoService.getAllTodos();
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR_500).json({
      code: TodoErrorCode.FETCHING_ERROR,
      message: 'Cannot fetch todos',
    });

    return;
  }

  res.status(StatusCode.OK_200).json(todos);
};

module.exports = handleGetTodos;
