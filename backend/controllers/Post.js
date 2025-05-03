const Post = require("../models/Posts");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const createError = require('../error')

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


module.exports = {

    createPost: async (req, res, next) => {
        try{
            const { name, prompt, photo } = req.body;
            const formattedPhoto = `data:image/png;base64,${photo}`;
            const photoUrl = await cloudinary.uploader.upload(formattedPhoto);
            const newPost = await Post.create({
                name: name,
                prompt: prompt,
                photo: photoUrl.url
            })
            res.status(200).json({success: true, data: newPost});
        }catch(error){
            return next(
                createError(
                  error.status,
                  error?.response?.data?.error.message || error.message
                )
            );
        }
    },

    getPosts: async (req, res, next) => {
        try{
            const posts = await Post.find({});
            res.status(200).json({success: true, data: posts});
        }catch(error){
            return next(
                createError(
                  error.status,
                  error?.response?.data?.error.message || error.message
                )
            );
        }
    }
}