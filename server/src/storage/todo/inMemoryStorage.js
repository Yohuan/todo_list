const _createInMemoryStorage = (initialTodos = []) => {
  let _todos = initialTodos;

  const getAllTodos = async () => {
    return _todos;
  };

  const saveTodo = async (todo) => {
    _todos.push(todo);
  };

  const getTodoById = async (todoId) => {
    const targetTodo = _todos.find(todo => todo.id === todoId);
    return !targetTodo ? null : targetTodo;
  };

  const deleteTodoById = async (todoId) => {
    _todos = _todos.filter(todo => todo.id !== todoId);
  };

  const updateTodoById = async (todoId, { description = null, isCompleted = null } = {}) => {
    const targetIdx = _todos.findIndex(todo => todo.id === todoId);
    if (targetIdx < 0) {
      // TODO: throw customized error
      throw new Error('todo not found');
    }

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
