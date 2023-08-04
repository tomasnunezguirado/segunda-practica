import { Router } from 'express';
import { passportCall } from '../utils/utils.js';
import cookieParser from 'cookie-parser';

const router = Router();

router.use(cookieParser(process.env.AUTH_SECRET));

router.post('/register', passportCall('register'), async (req, res) => {
    res.send({ status: 1, msg: "New flowerier registered" });
})

router.post('/login', passportCall('login', { session: false }), async (req, res) => {
      res.cookie(process.env.AUTH_COOKIE, req.user, { httpOnly: true }).send({ status: 1, msg: 'Flowerier successfully logged in', jwt: req.user });
});

router.post('/resetpassword', passportCall('resetPassword'), async (req, res) => {
    res.send({ status: 1, msg: 'Password successfully reseted.' });
});

router.post('/logout', (req, res) => {
    const jwtCookie = req.cookies[process.env.AUTH_COOKIE];
    if (!jwtCookie) {
        return res.status(400).send({ status: 0, msg: 'Flowerier is not logged in.' });
    }    
    res.clearCookie(process.env.AUTH_COOKIE).send({ status: 1, msg: 'Flowerier successfully logged out' });
});

router.get('/github', passportCall('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/githubcallback', passportCall('github'), async (req, res) => {
    res.cookie(process.env.AUTH_COOKIE, req.user, { httpOnly: true }).redirect('/products');
});

router.get('/currentuser', passportCall('jwt', { session: false }), async (req, res) => {
    res.send({ status: 1, msg: 'Flowerier logged in', user: req.user.user });
});

export default router;