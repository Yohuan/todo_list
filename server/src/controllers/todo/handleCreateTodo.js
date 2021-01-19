const handleCreateTodo = (req, res) => {
  // TODO: remove log
  console.log(req.body);
  const { todoDescription } = req.body;
};

module.exports = handleCreateTodo;
