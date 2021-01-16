const express = require('express');

const _PORT = 5566;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(_PORT, () => {
  console.log(`Listening at http://localhost:${_PORT}`);
});
