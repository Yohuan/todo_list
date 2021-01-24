const TodoService = require('@server/services/todo');
const {
  RunTimeErrorCode,
  TodoErrorCode,
} = require('@server/constants/error');
const { TodoNotFoundError } = require('@server/errors/todo');

module.exports = async (req, res) => {
  const { todoId } = req.params;
  const { id, description, isCompleted } = req.body;
  if ( todoId  !== id) {
    res.status(400).json({
      code: TodoErrorCode.ID_NOT_MATCH,
      message: 'Todo ID does not match with URL',
    });
  }

  try {
    await TodoService.updateTodoById(todoId, {
      description,
      isCompleted,
    });
    res.status(204).end();
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
