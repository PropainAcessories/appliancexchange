const jwt = require('jsonwebtoken');
const secret = '3000 Black Jets of Allah.';
const expiration = '30d';

module.exports = {
    authMiddleware: function ({ req }) {
        let token = req.headers.authorization;
        console.log(token);
        if (req.headers.authorization) {
            token = token.toString().split(' ').pop().trim();
        }

        if (!token) {
            return req
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data
        } catch {
            console.log('Invalid Token.');
            req.user = {};
        }
    },
    signToken: function ({ email, _id }) {
        const payload = { email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
