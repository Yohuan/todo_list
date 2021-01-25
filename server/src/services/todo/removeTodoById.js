const { todoInMemoryStorage } = require('@server/storage/todo');

module.exports = async todoId => todoInMemoryStorage.deleteTodoById(todoId);
