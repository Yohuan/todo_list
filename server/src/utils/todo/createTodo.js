const createTodoId = require('@server/utils/todo/createTodoId');

module.exports = todoDescription => ({
  id: createTodoId(),
  description: todoDescription,
  isCompleted: false,
});
