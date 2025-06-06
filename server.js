const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(`[Servidor] - ${req.method} ${req.url}`);
    next();
});



app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', authRoutes);
app.use('/', tasksRoutes);
app.use('/', projectsRoutes);  
app.use('/', commentsRoutes);
app.use('/', dashboardRoutes);

app.listen(PORT, () => {
    console.log(`[Servidor] - Aplicação rodando em http://localhost:${PORT}`);
});