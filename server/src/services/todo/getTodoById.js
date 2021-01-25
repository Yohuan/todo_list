const { todoInMemoryStorage } = require('@server/storage/todo');

module.exports = async todoId => todoInMemoryStorage.getTodoById(todoId);
