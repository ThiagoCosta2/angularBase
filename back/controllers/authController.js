const fs = require('fs');
const path = './data/usuarios.json';

const login = (req, res) => {
  const { email, senha } = req.body;
  const dados = JSON.parse(fs.readFileSync(path));

  const usuario = dados.find(u => u.email === email && u.senha === senha);
  if (usuario) {
    res.status(200).json({ mensagem: 'Login bem-sucedido!', usuario });
  } else {
    res.status(401).json({ mensagem: 'Credenciais inválidas.' });
  }
};

module.exports = { login };