const TodoService = require('@server/services/todo');
const { addObjectAttribute } = require('@server/utils/control');
const { Object } = require('@server/constants/resource');
const { RunTimeErrorCode, TodoErrorCode } = require('@server/constants/error');
const { StatusCode } = require('@server/constants/http');
const { TodoNotFoundError } = require('@server/errors/todo');

module.exports = async (req, res) => {
  const { todoId } = req.params;

  try {
    const todo = await TodoService.getTodoById(todoId);
    res.status(StatusCode.OK_200).json(addObjectAttribute(Object.TODO)(todo));
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
