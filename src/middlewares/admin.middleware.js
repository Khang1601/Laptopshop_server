let isAdmin = true;
export default {
    isAdmin: function(req, res, next) {
        if(isAdmin) {
           return next()
        }
        return res.status(500).json({
            message: "Admin check failed!"
        })
    }
}