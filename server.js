const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    console.log(`[Servidor] - ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.render('index');
});

const authRoutes = require('./routes/authRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/', authRoutes);
app.use('/', tasksRoutes);
app.use('/', projectsRoutes);  
app.use('/', commentsRoutes);
app.use('/', dashboardRoutes);

app.listen(PORT, () => {
    console.log(`[Servidor] - Aplicação rodando em http://localhost:${PORT}`);
});