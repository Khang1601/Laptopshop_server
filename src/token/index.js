import jwt from 'jsonwebtoken'
export default {
    createToken: function(user) {
        try {
            var token = jwt.sign({ data: user }, process.env.JWT_KEY, {expiresIn: '1d'});
            return token
        }catch(err) {
            return false
        }
    },
    verifyToken: function(token) {
        try {
            let data = jwt.verify(token, process.env.JWT_KEY);
            return data
        }catch(err) {
            return false
        }
    }
}