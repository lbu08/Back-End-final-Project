import { Router } from 'express';
import login from "../services/login/login.js";
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req, res) => {
	const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({ message: `Bad request` });
	} else {

		const loginPerson = await login(username, password);

		if (!loginPerson) {
			return res.status(401).json({ message: 'Invalid credentials!' });
		}

		const token = jwt.sign({ userId: loginPerson.id }, secretKey);
		res.status(200).json({ message: 'Successfully logged in!', token });
		
	}
});

export default router;











