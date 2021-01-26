const storageRegistry = require('./storageRegistry');
const { resetForTesting } = require('./storageRegistry');

const _DUMMY_STORAGE = {};

describe('storageRegistry', () => {
  beforeEach(() => {
    resetForTesting();
  });

  describe('getStorage', () => {
    it('throws error before registering', () => {
      expect(() => {
        storageRegistry.getStorage();
      }).toThrow();
    });
    it('gets the registered storage', () => {
      storageRegistry.register(_DUMMY_STORAGE);
      expect(storageRegistry.getStorage()).toBe(_DUMMY_STORAGE);
    });
  });
  describe('register', () => {
    it('throws error when registering twice', () => {
      storageRegistry.register(_DUMMY_STORAGE);
      expect(() => {
        storageRegistry.register(_DUMMY_STORAGE);
      }).toThrow();
    });
    it('registers storage for later usage', () => {
      storageRegistry.register(_DUMMY_STORAGE);
      expect(storageRegistry.getStorage()).toBe(_DUMMY_STORAGE);
    });
  });
});
