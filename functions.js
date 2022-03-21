const fs = require('fs').promises;

// Requisito 01
function getTalker() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

function setTalker(addTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(addTalker));
}

//  Requisito 03
// gerando token alfanumérico aleatório com 16 caracteres:
function rand() {
  return ((Math.random() + 1).toString(36).substring(2, 10));
}

function tokenGenerate() {
  return rand() + rand();
}

function validEmail(req, res, next) {
  const { email } = req.body;
  const emailCheck = (email && email.includes('@') && email.includes('.com'));
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailCheck) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

function validPassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 5) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

  function validToken(req, res, next) {
    const token = req.headers.authorization;
    const tokenRegex = /^[a-zA-Z0-9]{16}$/;
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    if (!tokenRegex.test(token)) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    next();
  }

function validName(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 4) {
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
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  const { watchedAt, rate } = talk;
  if (!watchedAt || !rate) {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
}

function validTalkKeys(req, res, next) {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  const regexDate = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
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
  getTalker,
  tokenGenerate,
  validPassword,
  validEmail,
  validName,
  validAge,
  validTalk,
  setTalker,
  validTalkKeys,
  validToken,
};