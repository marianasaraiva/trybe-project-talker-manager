const express = require('express');

const router = express.Router();

const { getTalker, setTalker } = require('../models/functions');
const { validToken } = require('../middlewares/validToken');
const { validName, validAge, validTalk, validTalkKeys } = require('../controllers/users');

router.get('/', async (req, res, _next) => {
  const talkerResult = await getTalker();
  if (!talkerResult) return res.status(200).json({});
  res.status(200).json(talkerResult);
});

router.get('/search',
  validToken,
  async (req, res) => {
  const { name } = req.query;
  const getTalkers = await getTalker();
  const filterTalker = getTalkers.filter((talker) => talker.name.includes(name));
  if (!name) return res.status(200).send(getTalkers);
  if (!filterTalker) return res.status(200).send(getTalkers);
  res.status(200).json(filterTalker);
});

router.get('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const talkerResult = await getTalker();
  const findTalkerById = talkerResult.find((talker) => talker.id === +id);
  if (!findTalkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(findTalkerById);
});

router.post('/',
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

router.put('/:id',
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

router.delete('/:id',
  validToken,
  async (req, res) => {
  const { id } = req.params;
  const getTalkers = await getTalker();
  const deleteID = getTalkers.filter((talker) => talker.id !== +id);
  await setTalker(deleteID);
  res.status(204).send();
});

module.exports = router;