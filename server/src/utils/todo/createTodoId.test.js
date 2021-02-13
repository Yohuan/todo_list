const createTodoId = require('./createTodoId');

describe('createTodoId', () => {
  it(`should create ID as string`, () => {
    const todoId = createTodoId();
    expect(todoId).toBeString();
  });
  it('should create ID prefixed with "todo_" and followed by alphabets (including numbers)', () => {
    const todoId = createTodoId();
    expect(todoId).toMatch(/^todo_[A-Za-z0-9]{6}$/);
  });
});
