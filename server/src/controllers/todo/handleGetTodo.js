const TodoService = require('@server/services/todo');
const {
  RunTimeErrorCode,
  TodoErrorCode,
} = require('@server/constants/error');
const { TodoNotFoundError } = require('@server/errors/todo');

module.exports = async (req, res) => {
  const { todoId } = req.params;

  try {
    const todo = await TodoService.getTodoById(todoId);
    res.status(200).json(todo);
  } catch (err) {
    if (err instanceof TodoNotFoundError) {
      res.status(404).json({
        code: TodoErrorCode.NOT_FOUND_ERROR,
        message: err.message,
      });

      return;
    }

    res.status(500).json({
      code: RunTimeErrorCode.UNKNOWN,
      message: 'Something wrong',
    });
  }
};
