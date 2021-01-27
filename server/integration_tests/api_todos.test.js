const fs = require('fs');
const path = require('path');

const request = require('supertest');
const YAML = require('yamljs');

const { buildApp } = require('@server/utils/app');
const { createTodoInMemoryStorage, todoStorageRegistry } = require('@server/storage/todo');
const { resetForTesting } = require('@server/storage/todo/storageRegistry');
const { TodoErrorCode } = require('@server/constants/error');

const _OPENAPI_SPEC_FILE = path.join(__dirname, '../config/openapi.yaml');

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

describe('GET /api/todos', () => {
  it('should return 200 with all todos', () => {
    _initializeTodoStorage();

    return request(app)
      .get('/api/todos')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(_INITIAL_TODOS);
      });
  });
  it('should return 500 with error code when storage fails', () => {
    _initializeFailedTodoStorage();

    return request(app)
      .get('/api/todos')
      .expect('Content-Type', /application\/json/)
      .expect(500)
      .expect(res => {
        const { code } = res.body;
        expect(code).toBe(TodoErrorCode.FETCHING_ERROR);
      });
  });
});

describe('POST /api/todos', () => {
  it('should return 201 with the created todo ID', () => {
    _initializeTodoStorage();

    return request(app)
      .post('/api/todos')
      .send({ todoDescription: 'a new todo' })
      .expect('Content-Type', /application\/json/)
      .expect(201)
      .expect(res => {
        const { todoId } = res.body;
        expect(todoId).toBeString();
        expect(todoId.length).toBe(6);
      });
  });
  it('should return 500 with error code when storage fails', () => {
    _initializeFailedTodoStorage();

    return request(app)
      .post('/api/todos')
      .send({ todoDescription: 'a new todo' })
      .expect('Content-Type', /application\/json/)
      .expect(500)
      .expect(res => {
        const { code } = res.body;
        expect(code).toBe(TodoErrorCode.CREATION_ERROR);
      });
  });
});
