const { Object } = require('@server/constants/resource');

module.exports = objects => ({
  object: Object.LIST,
  data: objects,
});
