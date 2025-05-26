const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.render('pages/index', { 
    pageTitle: 'Gerenciador de Tarefas' 
  });
});

app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/tasks", require("./routes/tasksRoutes"));
app.use("/api/projects", require("./routes/projectsRoutes"));
app.use("/api/comments", require("./routes/commentsRoutes"));

app.use((req, res) => {
  res.status(404).send('Página não encontrada');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

module.exports = app;