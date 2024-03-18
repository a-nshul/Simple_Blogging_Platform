const express = require('express');
const router = express.Router();
const {
    getAllPosts,
    getPostsByUser,
    createPost,
  } = require("../controllers/blogControllers");
const { protect } = require("../middleware/authMiddleware");


router.route("/").post(protect, createPost).get(protect, getAllPosts);
router.route("/:userId").get(protect, getPostsByUser);

module.exports = router;
