const addObjectAttribute = require('./addObjectAttribute');

describe('addObjectAttribute', () => {
  it('should add attribute "object"', () => {
    const object = { a: 1, b: 'B' };
    const result = addObjectAttribute('my_object')(object);
    expect(result).toEqual({
      object: 'my_object',
      ...object,
    });
  });
  it('should replace the original "object" attribute if it exists', () => {
    const object = { a: 1, object: 'my_object' };
    const result = addObjectAttribute('my_new_object')(object);
    expect(result.object).toBe('my_new_object');
  });
});
