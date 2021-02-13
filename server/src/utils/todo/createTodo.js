const createTodoId = require('@server/utils/todo/createTodoId');
const { getNowTimestampInSec } = require('@server/utils/time');

module.exports = todoDescription => ({
  id: createTodoId(),
  description: todoDescription,
  isCompleted: false,
  creationTime: getNowTimestampInSec(),
});
