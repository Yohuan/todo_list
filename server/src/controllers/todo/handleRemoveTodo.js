const TodoService = require('@server/services/todo');
const {
  RunTimeErrorCode,
  TodoErrorCode,
} = require('@server/constants/error');
const { TodoNotFoundError } = require('@server/errors/todo');

module.exports = async (req, res) => {
  const { todoId } = req.params;

  try {
    await TodoService.removeTodoById(todoId);
    res.status(204).end();
  } catch (err) {
    if (err instanceof TodoNotFoundError) {
      // Let DELETE be idempotent
      res.status(204).end();
      return;
    }

    res.status(500).json({
      code: RunTimeErrorCode.UNKNOWN,
      message: 'Something wrong',
    });
  }
};
