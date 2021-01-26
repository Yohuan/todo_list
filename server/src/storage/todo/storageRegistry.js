let _storage = null;

module.exports = {
  getStorage: () => {
    if (!_storage) {
      throw new Error('Storage has not been registered.');
    }

    return _storage;
  },
  register: storage => {
    if (_storage) {
      throw new Error('Storage has already been registered.');
    }
    _storage = storage;
  },
};

module.exports.resetForTesting = () => {
  _storage = null;
};
