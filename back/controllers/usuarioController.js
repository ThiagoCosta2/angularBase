const fs = require('fs');
const path = './data/usuarios.json';

const lerUsuarios = () => JSON.parse(fs.readFileSync(path));
const salvarUsuarios = (usuarios) => fs.writeFileSync(path, JSON.stringify(usuarios, null, 2));

const listarUsuarios = (req, res) => {
  res.json(lerUsuarios());
};

const buscarUsuarioPorId = (req, res) => {
  const { id } = req.params;
  const usuario = lerUsuarios().find(u => u.id == id);
  usuario ? res.json(usuario) : res.status(404).json({ mensagem: 'Usuário não encontrado' });
};

const criarUsuario = (req, res) => {
  const usuarios = lerUsuarios();
  const novo = { id: Date.now(), ...req.body };
  usuarios.push(novo);
  salvarUsuarios(usuarios);
  res.status(201).json(novo);
};

const atualizarUsuario = (req, res) => {
  const { id } = req.params;
  const usuarios = lerUsuarios();
  const index = usuarios.findIndex(u => u.id == id);

  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...req.body };
    salvarUsuarios(usuarios);
    res.json(usuarios[index]);
  } else {
    res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
};

const deletarUsuario = (req, res) => {
  const { id } = req.params;
  let usuarios = lerUsuarios();
  const usuario = usuarios.find(u => u.id == id);

  if (usuario) {
    usuarios = usuarios.filter(u => u.id != id);
    salvarUsuarios(usuarios);
    res.json({ mensagem: 'Usuário removido' });
  } else {
    res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
};

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};
