import * as communityModel from "../models/communityModel.js";

export const createPost = async (req, res) => {
  try {
    const userId = req.user.id;

    const postData = {
      content: req.body.content,
      user_id: userId
    };

    const { data, error } =
      await communityModel.createPost(postData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(201).json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const { data, error } =
      await communityModel.getAllPosts();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } =
      await communityModel.getPostsByUser(userId);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: post, error: fetchError } =
      await communityModel.getPostById(id);

    if (fetchError || !post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    if (post.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { error } =
      await communityModel.deletePost(id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};