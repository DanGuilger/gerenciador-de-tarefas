const express = require('express');
const router = express.Router();
// Defina suas rotas aqui
router.get('/', (req, res) => {
  res.send('Rota principal funcionando!');
});
module.exports = router;