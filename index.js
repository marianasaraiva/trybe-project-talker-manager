const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalker,
  token,
  validEmail,
  validPassword,
  validName,
  validAge,
  validTalk,
  setTalker,
  // validToken,
} = require('./functions');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Requisito 03
app.post('/login', validEmail, validPassword, (req, res, next) => {
  res.status(200).json({ token: `${token()}` });
  next();
});

// Requisito 01
app.get('/talker', async (req, res, _next) => {
const talkerResult = await getTalker();
if (!talkerResult) return res.status(200).json({});
res.status(HTTP_OK_STATUS).json(talkerResult);
});

// Requisito 02
app.get('/talker/:id', async (req, res, _next) => {
  const { id } = req.params;
  console.log(id);
  const talkerResult = await getTalker();
  console.log(talkerResult);
  const findTalkerById = talkerResult.find((talker) => talker.id === +id);
  if (!findTalkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(findTalkerById);
});

// Requisito 04
app.post('/talker', 
  // validToken,
  validName,
  validAge,
  validTalk,
  async (req, res, _next) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const getTalkers = await getTalker();
  await setTalker([
    ...getTalkers,
    { name, age, talk: { watchedAt, rate } }]);
  res.status(201).send({ name, age, talk: { watchedAt, rate } });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
