const _createInMemoryStorage = (initialTodos = []) => {
  const _todos = initialTodos;

  const getAllTodos = async () => {
    return _todos;
  };

  const saveTodo = async (todo) => {
    _todos.push(todo);
  };

  return {
    getAllTodos,
    saveTodo,
  }
};

module.exports = _createInMemoryStorage();
