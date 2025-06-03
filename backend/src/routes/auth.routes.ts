import express from 'express';
import { register, login, logout } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
      await register(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
router.post('/login', async (req, res, next) => {
    try {
        await login(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errorf'});
    }
});

router.get('/logout', async (req, res, next) => {
    try {
        await logout(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errorf'});
    }
});

export default router;
