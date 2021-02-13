const createTodo = require('./createTodo');

const _TESTING_DESCRIPTION = 'a test todo';
const _FAKE_NOW = 1613237969;

jest.mock('@server/utils/time/getNowTimestampInSec', () => {
  return jest.fn(() => _FAKE_NOW);
});

describe('createTodo', () => {
  it('should create todo with id as string', () => {
    const { id } = createTodo(_TESTING_DESCRIPTION);
    expect(id).toBeString();
  });
  it('should create todo containing correct attributes', () => {
    // eslint-disable-next-line no-unused-vars
    const { id, ...todoWithoutId } = createTodo(_TESTING_DESCRIPTION);
    expect(todoWithoutId).toEqual({
      description: _TESTING_DESCRIPTION,
      isCompleted: false,
      creationTime: _FAKE_NOW,
    });
  });
});
