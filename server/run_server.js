require('module-alias/register');

const { buildApp } = require('@server/utils/app')

const _PORT = 5566;

buildApp()
  .then(app => {
    app.listen(_PORT, () => {
      console.log(`Listening at http://localhost:${_PORT}`);
    });
  });

