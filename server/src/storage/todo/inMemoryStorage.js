const { TodoNotFoundError } = require('@server/errors/todo');

const _createTodoNotFoundError  = (todoId) => new TodoNotFoundError(`Cannot find todo with ID(${todoId})`);

const _createInMemoryStorage = (initialTodos = []) => {
  const _todos = initialTodos;

  const _findIdxById = (todoId) => {
    const targetIdx = _todos.findIndex(todo => todo.id === todoId);
    if (targetIdx < 0) {
      throw _createTodoNotFoundError(todoId);
    }

    return targetIdx;
  };

  const getAllTodos = async () => {
    return _todos;
  };

  const saveTodo = async (todo) => {
    _todos.push(todo);
  };

  const getTodoById = async (todoId) => {
    const targetIdx = _findIdxById(todoId);
    return _todos[targetIdx];
  };

  const deleteTodoById = async (todoId) => {
    const targetIdx = _findIdxById(todoId);

    _todos.splice(targetIdx, 1);
  };

  const updateTodoById = async (todoId, { description = null, isCompleted = null } = {}) => {
    const targetIdx = _findIdxById(todoId);

    if (description) {
      _todos[targetIdx].description = description;
    }
    if (isCompleted) {
      _todos[targetIdx].isCompleted = isCompleted;
    }
  };

  return {
    deleteTodoById,
    getAllTodos,
    getTodoById,
    saveTodo,
    updateTodoById,
  }
};

module.exports = _createInMemoryStorage();
