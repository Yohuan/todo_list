const { EndPoint } = require('@server/constants/server');

const _TODO_ENDPOINT = `${EndPoint.DOMAIN_NAME}:${EndPoint.PORT}/${EndPoint.API_ROOT}/todos`;

module.exports = (todoId) => `${_TODO_ENDPOINT}/${todoId}`;
