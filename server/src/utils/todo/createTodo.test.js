const createTodo = require('./createTodo');

const _TESTING_DESCRIPTION = 'a test todo';

describe('createTodo', () => {
  it('should create todo with id as 6-length string', () => {
    const { id } = createTodo(_TESTING_DESCRIPTION);
    expect(id).toBeString();
    expect(id.length).toBe(6);
  });
});
