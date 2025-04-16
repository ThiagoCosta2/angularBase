const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const FILE = 'user.json';

// Função auxiliar para ler o arquivo JSON
function lerUsuarios() {
  if (!fs.existsSync(FILE)) return [];
  const dados = fs.readFileSync(FILE);
  return JSON.parse(dados);
}

// Função auxiliar para salvar os usuários
function salvarUsuarios(usuarios) {
  fs.writeFileSync(FILE, JSON.stringify(usuarios, null, 2));
}

// Rota: GET /usuarios – listar todos
app.get('/usuarios', (req, res) => {
  const usuarios = lerUsuarios();
  res.json(usuarios);
});

// Rota: POST /usuarios – criar novo usuário
app.post('/usuarios', (req, res) => {
  const usuarios = lerUsuarios();
  const novoUsuario = {
    id: Date.now(),
    nome: req.body.nome,
    email: req.body.email
  };
  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);
  res.status(201).json(novoUsuario);
});

// Rota: PUT /usuarios/:id – atualizar usuário
app.put('/usuarios/:id', (req, res) => {
  const usuarios = lerUsuarios();
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  usuarios[index] = { ...usuarios[index], ...req.body };
  salvarUsuarios(usuarios);
  res.json(usuarios[index]);
});

// Rota: DELETE /usuarios/:id – remover usuário
app.delete('/usuarios/:id', (req, res) => {
  const usuarios = lerUsuarios();
  const id = parseInt(req.params.id);
  const novosUsuarios = usuarios.filter(u => u.id !== id);

  if (usuarios.length === novosUsuarios.length) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  salvarUsuarios(novosUsuarios);
  res.status(204).send();
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
