const fs = require('fs');
const path = require('path');

const request = require('supertest');
const YAML = require('yamljs');

const { buildApp } = require('@server/utils/app');
const { createTodoInMemoryStorage, todoStorageRegistry } = require('@server/storage/todo');
const { HttpHeader } = require('@server/constants/http');
const { resetForTesting } = require('@server/storage/todo/storageRegistry');
const { RunTimeErrorCode, TodoErrorCode } = require('@server/constants/error');

const _OPENAPI_SPEC_FILE = path.join(__dirname, '../config/openapi.yaml');
const _JSON_REGEX = /application\/json/;

const _INITIAL_TODOS = [
  {
    id: 'abcdef',
    description: 'first todo',
    isCompleted: false,
  },
  {
    id: 'ghijkl',
    description: 'second todo',
    isCompleted: true,
  },
];

const _prepareTestingApp = async () => {
  const apiSpecStr = fs.readFileSync(_OPENAPI_SPEC_FILE, 'utf8');
  const apiSpec = YAML.parse(apiSpecStr);
  return buildApp({ apiSpec });
};

const _initializeTodoStorage = () => {
  resetForTesting();
  const todoInMemoryStorage = createTodoInMemoryStorage(_INITIAL_TODOS);
  todoStorageRegistry.register(todoInMemoryStorage);
};

const _initializeFailedTodoStorage = () => {
  resetForTesting();
  const failedTodoStorage = null; // any operation on this storage will fail
  todoStorageRegistry.register(failedTodoStorage);
};

let app;
beforeAll(async () => {
  app = await _prepareTestingApp();
});

describe('GET /api/todos/{todoId}', () => {
  it('should return 200 with todo when giving existing ID', () => {
    _initializeTodoStorage();

    const todoId = 'abcdef';
    return request(app)
      .get(`/api/todos/${todoId}`)
      .expect(HttpHeader.CONTENT_TYPE, _JSON_REGEX)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual({
          id: 'abcdef',
          description: 'first todo',
          isCompleted: false,
        });
      });
  });
  it('should return 404 with error code when giving non-existing ID', () => {
    _initializeTodoStorage();

    const todoId = 'non-existing-id';
    return request(app)
      .get(`/api/todos/${todoId}`)
      .expect(HttpHeader.CONTENT_TYPE, _JSON_REGEX)
      .expect(404)
      .expect(res => {
        const { code } = res.body;
        expect(code).toBe(TodoErrorCode.NOT_FOUND_ERROR);
      });
  });
  it('should return 500 with error code when storage fails', () => {
    _initializeFailedTodoStorage();

    const todoId = 'abcdef';
    return request(app)
      .get(`/api/todos/${todoId}`)
      .expect(HttpHeader.CONTENT_TYPE, _JSON_REGEX)
      .expect(500)
      .expect(res => {
        const { code } = res.body;
        expect(code).toBe(RunTimeErrorCode.UNKNOWN);
      });
  });
});

describe('PUT /api/todos/{todoId}', () => {
  it('should return 204 when success', () => {
    _initializeTodoStorage();

    const todoId = 'abcdef';
    return request(app)
      .put(`/api/todos/${todoId}`)
      .send({
        id: todoId,
        description: 'modified todo',
        isCompleted: true,
      })
      .expect(204);
  });
  it('should modify an existing todo', () => {
    _initializeTodoStorage();

    const todoId = 'abcdef';
    return request(app)
      .put(`/api/todos/${todoId}`)
      .send({
        id: todoId,
        description: 'modified todo',
        isCompleted: true,
      })
      .then(() => {
        return request(app)
          .get(`/api/todos/${todoId}`)
          .expect(res => {
            expect(res.body).toEqual({
              id: 'abcdef',
              description: 'modified todo',
              isCompleted: true,
            });
          });
      });
  });
  it('should return 400 with error code when the input Id does not match', () => {
    _initializeTodoStorage();

    const todoId = 'abcdef';
    return request(app)
      .put(`/api/todos/${todoId}`)
      .send({
        id: 'another-todo-id',
        description: 'modified todo',
        isCompleted: true,
      })
      .expect(400)
      .expect(res => {
        const { code } = res.body;
        expect(code).toBe(TodoErrorCode.ID_NOT_MATCH);
      });
  });
  it('should return 404 with error code when giving non-existing ID', () => {
    _initializeTodoStorage();

    const todoId = 'non-exiting-id';
    return request(app)
      .put(`/api/todos/${todoId}`)
      .send({
        id: todoId,
        description: 'modified todo',
        isCompleted: true,
      })
      .expect(404)
      .expect(res => {
        const { code } = res.body;
        expect(code).toBe(TodoErrorCode.NOT_FOUND_ERROR);
      });
  });
  it('should return 500 with error code when storage fails', () => {
    _initializeFailedTodoStorage();

    const todoId = 'abcdef';
    return request(app)
      .put(`/api/todos/${todoId}`)
      .send({
        id: todoId,
        description: 'modified todo',
        isCompleted: true,
      })
      .expect(500)
      .expect(res => {
        const { code } = res.body;
        expect(code).toBe(RunTimeErrorCode.UNKNOWN);
      });
  });
});
