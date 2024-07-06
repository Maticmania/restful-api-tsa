import Product from "../models/product.js";
import { cloudinary } from "../helpers/cloudinary.config.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const imageFiles = req.files;

    // Validate required fields
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "name is required" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "description is required" });
    }
    if (!price) {
      return res
        .status(400)
        .json({ success: false, message: "price is required" });
    }
    if (!quantity) {
      return res
        .status(400)
        .json({ success: false, message: "quantity is required" });
    }

    // Generate slug from name
    const slug = slugify(name);

    // Upload images to Cloudinary and store their URLs and public IDs
    let uploadedImages = [];
    if (imageFiles && imageFiles.length > 0) {
      uploadedImages = await Promise.all(
        imageFiles.map(async (file) => {
          try {
            const imageResult = await cloudinary.uploader.upload(file.path);
            return {
              url: imageResult.secure_url,
              imagePublicId: imageResult.public_id,
            };
          } catch (err) {
            console.error("Error uploading image to Cloudinary:", err);
            return {
              error: "Failed to upload image",
            };
          }
        })
      );
    }

    // Check if any image upload failed
    const failedUploads = uploadedImages.filter((img) => img.error);
    if (failedUploads.length > 0) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to upload some images" });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      slug,
      description,
      price,
      quantity,
      images: uploadedImages,
    });

    // Save the product to the database
    await newProduct.save();

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: err.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, quantity } = req.body;
    const imageFiles = req.files;

    // Find the product by ID
    const product = await Product.findById({_id: productId} );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update product fields if provided
    if (name) {
      product.name = name;
      product.slug = slugify(name);
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    if (quantity) {
      product.quantity = quantity;
    }

    // Upload new images to Cloudinary if provided
    let uploadedImages = [];
    if (imageFiles && imageFiles.length > 0) {
      uploadedImages = await Promise.all(
        imageFiles.map(async (file) => {
          try {
            const imageResult = await cloudinary.uploader.upload(file.path);
            return {
              url: imageResult.secure_url,
              imagePublicId: imageResult.public_id,
            };
          } catch (err) {
            console.error("Error uploading image to Cloudinary:", err);
            return {
              error: "Failed to upload image",
            };
          }
        })
      );

      // Check if any image upload failed
      const failedUploads = uploadedImages.filter((img) => img.error);
      if (failedUploads.length > 0) {
        return res
          .status(500)
          .json({ success: false, message: "Failed to upload some images" });
      }

      // Update product images if new ones are uploaded
      product.images = uploadedImages;
    }

    // Save the updated product to the database
    await product.save();

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: err.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      const totalProducts = await Product.countDocuments();

      res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        totalProducts,
        products,
      });
    } catch (err) {
      console.error("Error retrieving products:", err.message);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve products",
        error: err.message,
      });
    }
  };


export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById({_id: productId});
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        product,
      });
    } catch (err) {
      console.error("Error retrieving product:", err.message);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve product",
        error: err.message,
      });
    }
  };
  
  
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;  
      // Find the product by ID
      const product = await Product.findByIdAndDelete({_id: productId});
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
  
      // Delete images from Cloudinary
      if (product.images && product.images.length > 0) {
        await Promise.all(
          product.images.map(async (image) => {
            try {
              await cloudinary.uploader.destroy(image.imagePublicId);
            } catch (err) {
              console.error("Error deleting image from Cloudinary:", err);
            }
          })
        );
      }
  
      // Respond with success message
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
  
    } catch (err) {
      console.error("Error deleting product:", err.message);
      res.status(500).json({
        success: false,
        message: "Failed to delete product",
        error: err.message,
      });
    }
  };