// gerando token alfanumérico aleatório com 16 caracteres: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript/38622545
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
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
}

module.exports = { tokenGenerate, validEmail, validPassword };