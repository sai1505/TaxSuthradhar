import express from 'express';
import { signupUser, signinUser } from '../controllers/authController.js';

const router = express.Router();

/**
 * @route   POST /signup
 * @desc    Register a new user
 */
router.post('/signup', signupUser);

/**
 * @route   POST /signin
 * @desc    Authenticate a user
 */
router.post('/signin', signinUser);

export default router;
