const R = require('ramda');

const TodoService = require('@server/services/todo');
const { addObjectAttribute, wrapAsListObject } = require('@server/utils/control');
const { Object } = require('@server/constants/resource');
const { StatusCode } = require('@server/constants/http');
const { TodoErrorCode } = require('@server/constants/error');

const _mapAsTodoList = R.pipe(R.map(addObjectAttribute(Object.TODO)), wrapAsListObject);

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

  res.status(StatusCode.OK_200).json(_mapAsTodoList(todos));
};

module.exports = handleGetTodos;
