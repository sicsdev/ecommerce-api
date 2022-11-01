const user_route = require('./app/modules/routes/user.route');

module.exports = [
    {
        path: '/api/v1/user',
        handler: user_route
    }
]