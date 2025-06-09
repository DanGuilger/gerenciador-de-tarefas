function requireAuth(req, res, next) {
    if (!req.session || !req.session.usuario) {
        return res.redirect('/login');
    }
    
    req.usuario_id = req.session.usuario.id;
    next();
}

module.exports = { requireAuth };