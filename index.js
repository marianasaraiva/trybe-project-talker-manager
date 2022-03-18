const express = require('express');
const bodyParser = require('body-parser');
const { getTalker } = require('./functions');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Requisito 01
app.get('/talker', async (req, res, _next) => {
const talkerResult = await getTalker();
res.status(HTTP_OK_STATUS).json(talkerResult);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
