const { getPayload } = require("../utils/AuthUtils");

exports.isAuth = (req, res, next) => {
    try {
        const token = req.get("Authorization")?.split(" ")[1];
        if (!token) {
            const error = new Error("Not authenticated")
            error.status = 403;
            throw error;
        }
        const payload = getPayload(token);

        req.user = payload;
        next();
    }
    catch (err) {
        next(err);
    }
}

exports.isAuthAdmin = (req, res, next) => {
    try {
        console.log("Heree");
        
        const token = req.get('Authorization')?.split(" ")[1];
        if (!token) {
            const error = new Error("Not authenticated")
            error.status = 403;
            throw error;
        }
        const payload = getPayload(token);
        req.user = payload;
        if (payload.role == "Admin")
            return next();
        else {
            const error = new Error("Not authenticated")
            error.status = 403;
            throw error;
        }
    } catch (err) {
        next(err);
    }
}