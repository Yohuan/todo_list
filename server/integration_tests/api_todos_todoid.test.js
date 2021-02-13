const fs = require('fs');
const path = require('path');

const request = require('supertest');
const YAML = require('yamljs');

const { buildApp } = require('@server/utils/app');
const { ClientErrorCode, RunTimeErrorCode, TodoErrorCode } = require('@server/constants/error');
const { HttpHeader } = require('@server/constants/http');
const { initializeTodoStorage, initializeFailedTodoStorage } = require('@server/utils/testing');

const _OPENAPI_SPEC_FILE = path.join(__dirname, '../config/openapi.yml');
const _JSON_REGEX = /application\/json/;

const _TESTING_TODO_ID = 'todo_abcdef';
const _INITIAL_TODOS = [
  {
    id: _TESTING_TODO_ID,
    description: 'first todo',
    isCompleted: false,
  },
];

const _prepareTestingApp = async () => {
  const apiSpecStr = fs.readFileSync(_OPENAPI_SPEC_FILE, 'utf8');
  const apiSpec = YAML.parse(apiSpecStr);
  return buildApp({ apiSpec });
};

const _initializeTodoStorage = () => initializeTodoStorage(_INITIAL_TODOS);

let app;
beforeAll(async () => {
  app = await _prepareTestingApp();
});

describe('GET /api/todos/{todoId}', () => {
  it('should return 200 with todo when giving existing ID', () => {
    _initializeTodoStorage();

    return request(app)
      .get(`/api/todos/${_TESTING_TODO_ID}`)
      .expect(HttpHeader.CONTENT_TYPE, _JSON_REGEX)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual({
          id: _TESTING_TODO_ID,
          object: 'todo',
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
    initializeFailedTodoStorage();

    return request(app)
      .get(`/api/todos/${_TESTING_TODO_ID}`)
      .expect(HttpHeader.CONTENT_TYPE, _JSON_REGEX)
      .expect(500)
      .expect(res => {
        const { code } = res.body;
        expect(code).toBe(RunTimeErrorCode.UNKNOWN);
      });
  });
});

describe('PUT /api/todos/{todoId}', () => {
  it('should return 200 with modified todo', () => {
    _initializeTodoStorage();

    return request(app)
      .put(`/api/todos/${_TESTING_TODO_ID}`)
      .send({
        description: 'modified todo',
        isCompleted: true,
      })
      .expect(200)
      .expect(res => {
        const todo = res.body;
        expect(todo).toEqual({
          id: _TESTING_TODO_ID,
          object: 'todo',
          description: 'modified todo',
          isCompleted: true,
        });
      });
  });
  it('should modify an existing todo', () => {
    _initializeTodoStorage();

    return request(app)
      .put(`/api/todos/${_TESTING_TODO_ID}`)
      .send({
        description: 'modified todo',
        isCompleted: true,
      })
      .then(() => {
        return request(app)
          .get(`/api/todos/${_TESTING_TODO_ID}`)
          .expect(res => {
            const todo = res.body;
            expect(todo.description).toBe('modified todo');
            expect(todo.isCompleted).toBeTrue();
          });
      });
  });
  it('should return 404 with error code when giving non-existing ID', () => {
    _initializeTodoStorage();

    const todoId = 'non-exiting-id';
    return request(app)
      .put(`/api/todos/${todoId}`)
      .send({
        description: 'modified todo',
        isCompleted: true,
      })
      .expect(404)
      .expect(res => {
        const { code } = res.body;
        expect(code).toBe(TodoErrorCode.NOT_FOUND_ERROR);
      });
  });
  it('should return 400 with error code when giving no target updating field', () => {
    _initializeTodoStorage();

    return request(app)
      .put(`/api/todos/${_TESTING_TODO_ID}`)
      .send({}) // no target field
      .expect(400)
      .expect(res => {
        const { code } = res.body;
        expect(code).toBe(ClientErrorCode.PARAMETER_PRECONDITION_FAILED);
      });
  });
  it('should return 500 with error code when storage fails', () => {
    initializeFailedTodoStorage();

    return request(app)
      .put(`/api/todos/${_TESTING_TODO_ID}`)
      .send({
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

describe('DELETE /api/todos/{todoId}', () => {
  it('should return 204 when success', () => {
    _initializeTodoStorage();

    return request(app).delete(`/api/todos/${_TESTING_TODO_ID}`).expect(204);
  });
  it('should delete an existing todo', () => {
    _initializeTodoStorage();

    return request(app)
      .delete(`/api/todos/${_TESTING_TODO_ID}`)
      .then(() => {
        return request(app).get(`/api/todos/${_TESTING_TODO_ID}`).expect(404);
      });
  });
  it('should be idempotent', () => {
    _initializeTodoStorage();

    return request(app)
      .delete(`/api/todos/${_TESTING_TODO_ID}`)
      .then(() => {
        return request(app).delete(`/api/todos/${_TESTING_TODO_ID}`).expect(204);
      });
  });
  it('should return 500 with error code when storage fails', () => {
    initializeFailedTodoStorage();

    return request(app)
      .delete(`/api/todos/${_TESTING_TODO_ID}`)
      .expect(500)
      .expect(res => {
        const { code } = res.body;
        expect(code).toBe(RunTimeErrorCode.UNKNOWN);
      });
  });
});
