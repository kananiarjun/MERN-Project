// middlewares/admin.js
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();  // Allow access to the next route
    }
    res.status(403).send('Access denied');
}

module.exports = isAdmin;
