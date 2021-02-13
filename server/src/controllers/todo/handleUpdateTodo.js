const TodoService = require('@server/services/todo');
const { addObjectAttribute } = require('@server/utils/control');
const { ClientErrorCode, RunTimeErrorCode, TodoErrorCode } = require('@server/constants/error');
const { Object } = require('@server/constants/resource');
const { StatusCode } = require('@server/constants/http');
const { TodoNotFoundError } = require('@server/errors/todo');

module.exports = async (req, res) => {
  const { todoId } = req.params;
  const { description, isCompleted } = req.body;
  if (description === undefined && isCompleted === undefined) {
    res.status(StatusCode.BAD_REQUEST_400).json({
      code: ClientErrorCode.PARAMETER_PRECONDITION_FAILED,
      message: 'At least one target field must be given',
    });
    return;
  }

  let todo;
  try {
    await TodoService.updateTodoById(todoId, {
      description,
      isCompleted,
    });
    todo = await TodoService.getTodoById(todoId);
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
    return;
  }

  res.status(StatusCode.OK_200).json(addObjectAttribute(Object.TODO)(todo));
};
