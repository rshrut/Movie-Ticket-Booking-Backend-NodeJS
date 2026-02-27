import * as authService from '../services/auth.js';

export const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        const token = authService.generateToken(user);

        res.status(201).json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.authenticateUser(email, password);
        const token = authService.generateToken(user);

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};