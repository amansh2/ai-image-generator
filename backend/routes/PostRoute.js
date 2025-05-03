const express = require("express");
const { createPost, getPosts } = require("../controllers/Post.js");

const router = express.Router();

router.post("/createPost", createPost);
router.get('/getPosts', getPosts)

module.exports = router;
