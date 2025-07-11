// middlewares/user.js
function isUser(req, res, next) {
    if (req.session.user && req.session.user.role === 'user') {
        return next();  // Allow access to the next route
    }
    res.status(403).send('Access denied');
}

module.exports = isUser;
