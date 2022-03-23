function validName(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validAge(req, res, next) {
  const { age } = req.body;
  if (!+age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age === '') { 
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function validTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  const { rate } = talk;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
}

function validTalkKeys(req, res, next) {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  // Referência do Regex data: https://pt.stackoverflow.com/questions/371316/valida%C3%A7%C3%A3o-regex-de-data-com-2-2-4-caracteres
  const regexDate = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!watchedAt || !rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!regexDate.test(watchedAt)) {
   return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
}

module.exports = {
  validName,
  validAge,
  validTalk,
  validTalkKeys,
};