const express = require("express");
const router = express.Router();

// Import Middleware
const { authMiddleware } = require("../middlewares/authMiddleware");

// Import Controllers
const { createPost, deletePost, getAllPosts, getSinglePostById, updatePost, getAllPostsByAuthor } = require("../controllers/postController")

// -------------------- Routes ---------------------
// CREATE POST
/**
 * @swagger
* /api/post/createPost:
*   post:
*     summary: Create a new post
*     description: Allows authenticated users to create a new post.
*     tags:
*       - Posts
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - title
*               - content
*               - tags
*             properties:
*               title:
*                 type: string
*                 example: "My First Blog Post"
*               content:
*                 type: string
*                 example: "This is the content of the blog post."
*               tags:
*                 type: array
*                 items:
*                   type: string
*                 example: ["tech", "coding"]
*     responses:
*       201:
*         description: Post created successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "Post created successfully"
*                 newPost:
*                   type: object
*                   properties:
*                     title:
*                       type: string
*                       example: "My First Blog Post"
*                     content:
*                       type: string
*                       example: "This is the content of the blog post."
*                     tags:
*                       type: array
*                       items:
*                         type: string
*                       example: ["tech", "coding"]
*                     author:
*                       type: string
*                       example: "60d0fe4f5311236168a109ca"
*       400:
*         description: Missing required fields or invalid tags format
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "All fields are required, and tags must be an array."
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "Internal server error"
*/
router.post("/createPost", authMiddleware, createPost)


// GET ALL POSTS
/**
 * @swagger
 * /api/allPosts:
 *   get:
 *     summary: Retrieve all posts (with optional filtering)
 *     description: Fetch all posts with optional filters by author, tag, or search by title.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter posts by author ID
 *         example: "67c081......25e4dc"
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter posts by tag
 *         example: "Node.js"
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search posts by title (case-insensitive)
 *         example: "Express"
 *     responses:
 *       200:
 *         description: A list of posts matching the criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "67c190........11091d"
 *                   title:
 *                     type: string
 *                     example: "Nodejs + Express"
 *                   content:
 *                     type: string
 *                     example: "When building a scalable backend system.........."
 *                   author:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         example: "johndoe"
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Backend", "Node.js", "Web Apps"]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-28T10:29:38.974Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-28T10:29:38.974Z"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/allPosts", getAllPosts);


// GET SINGLE POST BY ID
/**
 * @swagger
 * /api/post/singlePost/{postId}:
 *   get:
 *     summary: Retrieve a single post by ID
 *     description: Fetches a specific post using its ID, including the author's username.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "67c19....1091d"
 *                 title:
 *                   type: string
 *                   example: "Nodejs + Express"
 *                 content:
 *                   type: string
 *                   example: "When building a scalable backend system......"
 *                 author:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Backend", "Node.js", "Web Apps"]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-28T10:29:38.974Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-28T10:29:38.974Z"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post not found."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
*/
router.get("/singlePost/:postId", getSinglePostById);


// GET ALL POSTs BY AUTHOR
/**
 * @swagger
 * /post/all-authors-post/{authorId}:
 *   get:
 *     summary: Get all posts by a specific author
 *     description: Retrieves all blog posts created by a specific author. The `authorId` is extracted from the token stored in local storage.
 *     tags:
 *       - Posts
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the author (extracted from the token).
 *     responses:
 *       200:
 *         description: Successfully retrieved posts by the author.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "65d11f1b2a5e4c001d4c8e34"
 *                   title:
 *                     type: string
 *                     example: "Node.js + Express"
 *                   content:
 *                     type: string
 *                     example: "Introduction to building web apps with Node.js and Express."
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Backend", "Node.js", "Web Apps"]
 *                   author:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "65a123f1b2a5e4c001d4b567"
 *                       username:
 *                         type: string
 *                         example: "john_doe"
 *       404:
 *         description: No posts found for the author.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: []
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */
router.get("/all-authors-post/:authorId", authMiddleware, getAllPostsByAuthor);


// UPDATE POST
/**
 * @swagger
 * /api/post/updatePost/{postId}:
 *   patch:
 *     summary: Update a post (partial update)
 *     description: Allows the author to update specific fields of a post (title, content, or tags). Requires authentication.
 *     tags:
 *       - Posts
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Post Title"
 *               content:
 *                 type: string
 *                 example: "This is the updated content of the post."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["JavaScript", "Node.js"]
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post updated successfully"
 *                 post:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "65c7a9f2dcd81c001fc65e38"
 *                     title:
 *                       type: string
 *                       example: "Updated Post Title"
 *                     content:
 *                       type: string
 *                       example: "This is the updated content of the post."
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["JavaScript", "Node.js"]
 *                     author:
 *                       type: string
 *                       example: "65c7a8f2dcd81c001fc65e21"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-28T10:29:38.974Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-28T12:30:00.000Z"
 *       400:
 *         description: Invalid request or missing parameters
 *       403:
 *         description: Unauthorized - User is not the author of the post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.patch("/updatePost/:postId", authMiddleware, updatePost);


// DELETE POST
/**
 * @swagger
 * /api/post/deletePost/{postId}:
 *   delete:
 *     summary: Delete a post
 *     description: Deletes a post by its ID. Only the author of the post can delete it.
 *     tags:
 *       - Posts
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post deleted successfully
 *       403:
 *         description: Unauthorized - Only the author can delete the post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized. Only the author can delete this post.
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post not found.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.delete("/deletePost/:postId", authMiddleware, deletePost);

module.exports = router