import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    let token;

    // 1. Check if the Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the string "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the token using your secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Attach the decoded user data (id, role) to the request object
            // This is the Node equivalent of SecurityContextHolder
            req.user = decoded;

            // 4. Proceed to the next function (the Controller)
            next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    // If no token was found at all
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token provided" });
    }
};