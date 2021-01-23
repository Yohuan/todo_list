const TodoService = require('@server/services/todo');
const { TodoErrorCode } = require('@server/constants/error');

const handleGetTodos = async (req, res) => {
  let todos;
  try {
    todos = await TodoService.getAllTodos();
  } catch (err) {
    res.status(500).json({
      code: TodoErrorCode.FETCHING_ERROR,
      message: 'Cannot fetch todos',
    });
  }

  res.status(200).json(todos);
};

module.exports = handleGetTodos;
