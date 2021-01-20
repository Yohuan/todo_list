const _createInMemoryStorage = (initialTodos = []) => {
  const _todos = initialTodos;

  const saveTodo = async (todo) => {
    _todos.push(todo);
  };

  return {
    saveTodo,
  }
};

module.exports = _createInMemoryStorage();
