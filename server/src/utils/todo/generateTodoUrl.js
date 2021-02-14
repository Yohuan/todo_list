const { getTodoEndPoint } = require('@server/utils/endpoint');

module.exports = todoId => `${getTodoEndPoint()}/${todoId}`;
