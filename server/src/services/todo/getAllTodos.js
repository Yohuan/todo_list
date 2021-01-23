const { todoInMemoryStorage } = require('@server/storage/todo');

module.exports = async () => todoInMemoryStorage.getAllTodos();
