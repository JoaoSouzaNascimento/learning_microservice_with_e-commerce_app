import { Request, Response } from 'express';
import AuthService from '../services/authService';

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const user = await AuthService.register(username, email, password);
        res.status(201).json(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await AuthService.login(email, password);
        res.status(201).json({ message: 'Login successful' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(401).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};

export { register, login };