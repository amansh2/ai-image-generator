import axios from "axios";

// http://localhost:8080/api/
const API = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export const GetPosts = async () => await API.get("/post/getPosts");
export const CreatePost = async (data) => await API.post("/post/createPost", data);
export const GenerateImageFromPrompt = async (data) => await API.post("/generateImage/", data);
