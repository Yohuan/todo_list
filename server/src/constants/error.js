const ClientErrorCode = {
  PARAMETER_PRECONDITION_FAILED: 300,
};

const RunTimeErrorCode = {
  UNKNOWN: 200,
};

const TodoErrorCode = {
  CREATION_ERROR: 100,
  FETCHING_ERROR: 101,
  NOT_FOUND_ERROR: 102,
  ID_NOT_MATCH: 103,
};

module.exports = {
  ClientErrorCode,
  RunTimeErrorCode,
  TodoErrorCode,
};
