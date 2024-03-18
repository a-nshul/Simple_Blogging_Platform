const asyncHandler = require("express-async-handler");
const Blog = require("../modal/blogModal");

const createPost = asyncHandler(async (req, res) => {
   try{
    const newBlog=await Blog.create(req.body);
    const populateUser=await Blog.findById(newBlog._id).populate("user");
    res.status(200).json({populateUser,message:"Successfully created a new blog"});
   }catch(error){
    res.status(400).json({error:error.message});
   }
});

const getAllPosts = asyncHandler(async (req, res) => {
  try {
    let query = {};
    if (req.query.title) {
      query.title = { $regex: new RegExp(req.query.title, 'i') };
    }
    
    const blogs = await Blog.find(query).populate("user");
    const totalDocument=await Blog.countDocuments();
    res.status(200).json({ blogs, totalDocument,message: "Fetching posts" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getPostsByUser =asyncHandler(async(req,res)=>{
   try {
      const userId = req.params.userId;
      const blogs = await Blog.find({ user: userId }).populate('user');
      res.json(200).json({blogs,message:"fetched data by userid"});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
})
module.exports = { createPost,getAllPosts,getPostsByUser };
