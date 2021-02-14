const getListeningPort = require('./getListeningPort');
const { EndPoint } = require('@server/constants/server');

module.exports = () => `${EndPoint.DOMAIN_NAME}:${getListeningPort()}/api/todos`;
