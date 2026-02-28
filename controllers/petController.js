import * as petModel from "../models/petModel.js";
import { supabase } from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

export const createPet = async (req, res) => {
  try {
    const userId = req.user.id;

    let imageUrl = null;

    // 🔥 Handle image upload if file exists
    if (req.file) {
      const fileExt = req.file.originalname.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("pet-images")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }

      const { data } = supabase.storage
        .from("pet-images")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const petData = {
      ...req.body,
      user_id: userId,
      image_url: imageUrl,
    };

    const { data, error } = await petModel.createPet(petData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(201).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getPets = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await petModel.getPetsByUser(userId);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getPetById = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.id;

    const { data, error } = await petModel.getPetById(petId, userId);

    if (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updatePet = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.id;

    let imageUrl = null;

    // 🔥 Handle image update if new file uploaded
    if (req.file) {
      const fileExt = req.file.originalname.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("pet-images")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }

      const { data } = supabase.storage
        .from("pet-images")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const updateData = {
      ...req.body,
    };

    if (imageUrl) {
      updateData.image_url = imageUrl;
    }

    const { data, error } = await petModel.updatePet(
      petId,
      userId,
      updateData
    );

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deletePet = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.id;

    const { error } = await petModel.deletePet(petId, userId);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};