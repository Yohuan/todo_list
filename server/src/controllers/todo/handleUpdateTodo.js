const TodoService = require('@server/services/todo');
const {
  RunTimeErrorCode,
  TodoErrorCode,
} = require('@server/constants/error');
const { StatusCode } = require('@server/constants/http');
const { TodoNotFoundError } = require('@server/errors/todo');

module.exports = async (req, res) => {
  const { todoId } = req.params;
  const { id, description, isCompleted } = req.body;
  if ( todoId  !== id) {
    res.status(StatusCode.BAD_REQUEST_400).json({
      code: TodoErrorCode.ID_NOT_MATCH,
      message: 'Todo ID does not match with URL',
    });
  }

  try {
    await TodoService.updateTodoById(todoId, {
      description,
      isCompleted,
    });
    res.status(StatusCode.NO_CONTENT_204).end();
  } catch (err) {
    if (err instanceof TodoNotFoundError) {
      res.status(StatusCode.NOT_FOUND_404).json({
        code: TodoErrorCode.NOT_FOUND_ERROR,
        message: err.message,
      });

      return;
    }

    res.status(StatusCode.INTERNAL_SERVER_ERROR_500).json({
      code: RunTimeErrorCode.UNKNOWN,
      message: 'Something wrong',
    });
  }
};
