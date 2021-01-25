const { nanoid } = require('nanoid');

module.exports = todoDescription => ({
  id: nanoid(6),
  description: todoDescription,
  isCompleted: false,
});
