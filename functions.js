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

function token() {
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
  const test = req.headers.authorization;
  const tokenRegex = !/^[a-zA-Z0-9]{12}$/;

  if (!test || tokenRegex.test(test)) {
    return res.status(401).json({ message: 'invalid token' });
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

module.exports = {
  getTalker,
  token,
  validPassword,
  validEmail,
  validName,
  validAge,
  validTalk,
  setTalker,
  validToken,
};