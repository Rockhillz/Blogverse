const express = require('express');
const router = express.Router();
const rateLimit =  require("express-rate-limit");

// ------------------ RATE LIMITER ------------------
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: { error: "Too many login attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false, 
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: "Too many registration attempts, please try again later." },
});

// Import Controllers
const { registerUser, loginUser } = require('../controllers/userController');

// -------------------- ROUTES --------------------

// User Registration Route
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account if the email and username are unique. 
 *                  Limited to 10 attempts per hour per IP.
 *     tags:
 *       - User Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "strongpassword123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 savedUser:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "user@example.com"
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *       400:
 *         description: Bad request (missing fields or user already exists)
 *       429:
 *         description: Too many registration attempts (rate limit exceeded)
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerLimiter, registerUser);

// Login User Route
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and return a JWT token
 *     description: Logs in a user using email or username and password, then returns a JWT token. 
 *                  Limited to 5 login attempts per 15 minutes per IP.
 *     tags:
 *       - User Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrUsername
 *               - password
 *             properties:
 *               emailOrUsername:
 *                 type: string
 *                 example: "user@example.com/john_doe"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "mypassword123"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token and user details
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Invalid credentials (wrong username/email or password)
 *       429:
 *         description: Too many login attempts (rate limit exceeded)
 *       500:
 *         description: Internal server error
 */
router.post("/login", loginLimiter, loginUser);

module.exports = router;