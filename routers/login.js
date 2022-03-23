const express = require('express');

const router = express.Router();

const { tokenGenerate, validEmail, validPassword } = require('../controllers/login');

router.post('/', validEmail, validPassword, (req, res, next) => {
  res.status(200).json({ token: `${tokenGenerate()}` });
  next();
});

module.exports = router;