const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalker,
  tokenGenerate,
  validEmail,
  validPassword,
  validName,
  validAge,
  validTalk,
  setTalker,
  validTalkKeys,
  validToken,
} = require('./functions');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Requisito 03
app.post('/login', validEmail, validPassword, (req, res, next) => {
  res.status(200).json({ token: `${tokenGenerate()}` });
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
  const talkerResult = await getTalker();
  const findTalkerById = talkerResult.find((talker) => talker.id === +id);
  if (!findTalkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(findTalkerById);
});

// Requisito 04
// Auxilio mentoria: Rafa Guimaraes com correção de bugs.
app.post('/talker',
  validToken,
  validName,
  validAge,
  validTalk,
  validTalkKeys,
  async (req, res, _next) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const getTalkers = await getTalker();
    await setTalker([
      ...getTalkers,
      { name, age, id: getTalkers.length + 1, talk: { watchedAt, rate } }]);
    res.status(201).send({ name, age, id: getTalkers.length + 1, talk: { watchedAt, rate } });
  });

// Requisito 05
// app.put('/talker/:id',
//   validToken,
//   validName,
//   validAge,
//   validTalk,
//   validTalkKeys,
//   async (req, res, _next) => {
//     const { id } = req.params;
//     const { name, age, talk: { watchedAt, rate } } = req.body;
//     const getTalkers = await getTalker();
//     const findPutID = getTalkers.find((talker) => talker.id === +id);
//     await setTalker([
//       getTalkers[findPutID] = { ...getTalkers[findPutID], name, id, age, talk: { watchedAt, rate } },
//     ]);
//     return res.status(200).send([
//       getTalkers[findPutID] = { ...getTalkers[findPutID], name, id, age, talk: { watchedAt, rate } },
//     ]);
//   });

// Requisito 05
app.put('/talker/:id',
  validToken,
  validName,
  validAge,
  validTalk,
  validTalkKeys,
  async (req, res, _next) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const getTalkers = await getTalker();
    const findPut = getTalkers.find((talker) => talker.id === +id);
    findPut.name = name;
    findPut.age = age;
    findPut.talk = talk;
    await setTalker([...getTalkers]);
    return res.status(200).send(findPut);
  });

// Requisito 06
app.delete('/talker/:id', validToken, async (req, res) => {
  const { id } = req.params;
  const getTalkers = await getTalker();
  const deleteID = getTalkers.filter((talker) => talker.id === id);
  await setTalker([deleteID]);
  res.status(204).send();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
