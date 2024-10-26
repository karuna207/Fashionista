import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//function for add product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    console.log("image1", req.files.image1);

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => {
      return item != undefined;
    });

    console.log(images);

    let imagesUrl = await Promise.all(
      images.map(async (item) => { 
        console.log("items path",item.path)
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    console.log(imagesUrl);
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller == "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);

    await product.save();

    res.json({
      success: true,
      message: "Product Added",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

//function for display product

const showProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    console.log(products);
    res.json({ success: true, products});
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
//function for removing product

const removeProduct = async (req, res) => {
  try { 
    console.log(req.body.id);
    await productModel.findByIdAndDelete(req.body.id);
    res.json({
      success: "true",
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.json({
        success:false,
        message:err.message
    })
    }
  };
//function for singleProductInfo

const singleProduct = async (req, res) => { 
    try{
        const {productId}=req.body; 
        const product=await productModel.findById(productId);
        res.json({success:true,product});

    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message:err.message
        })
    }
    
};

export { addProduct, showProducts, removeProduct, singleProduct };
