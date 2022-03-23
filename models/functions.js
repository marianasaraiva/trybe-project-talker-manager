const fs = require('fs').promises;

// models
function getTalker() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}
// models
function setTalker(addTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(addTalker));
}

module.exports = { getTalker, setTalker };