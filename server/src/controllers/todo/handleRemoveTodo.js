const TodoService = require('@server/services/todo');
const { RunTimeErrorCode } = require('@server/constants/error');
const { StatusCode } = require('@server/constants/http');
const { TodoNotFoundError } = require('@server/errors/todo');

module.exports = async (req, res) => {
  const { todoId } = req.params;

  try {
    await TodoService.removeTodoById(todoId);
    res.status(StatusCode.NO_CONTENT_204).end();
  } catch (err) {
    if (err instanceof TodoNotFoundError) {
      // Let DELETE be idempotent
      res.status(StatusCode.NO_CONTENT_204).end();
      return;
    }

    res.status(StatusCode.INTERNAL_SERVER_ERROR_500).json({
      code: RunTimeErrorCode.UNKNOWN,
      message: 'Something wrong',
    });
  }
};
