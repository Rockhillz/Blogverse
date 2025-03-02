const express = require('express');
const router = express.Router();

// Importing Middleware
const { authMiddleware } = require("../middlewares/authMiddleware");

// Importing Controllers
const { getUserPostsAnalytics } = require("../controllers/analyticsController");

// -------------------- ROUTES --------------------
/**
 * @swagger
 * /api/analytics/dashboard:
 *   get:
 *     summary: Get post analytics for the logged-in user
 *     description: Returns the total number of posts created by the logged-in user, total posts in the last 7 days, and the count of posts per tag.
 *     tags:
 *       - Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved analytics data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPosts:
 *                   type: integer
 *                   example: 15
 *                 totalRecentPosts:
 *                   type: integer
 *                   example: 5
 *                 postsByTag:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                   example:
 *                     react: 3
 *                     nodejs: 2
 *                     mongodb: 1
 *       400:
 *         description: User ID is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User ID is required."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong."
 */
router.get("/dashboard", authMiddleware, getUserPostsAnalytics);

module.exports = router;