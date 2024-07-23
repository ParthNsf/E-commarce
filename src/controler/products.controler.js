const fileupload = require("../Ultis/Cloudinary");
const Products = require("../model/products.model");

const listproducts = async (req, res) => {
  try {
    const product = await Products.find();
    if (!product || product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product data not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product data fetched.",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const addproducts = async (req, res) => {
  console.log("add products");
  console.log(req.file.path, "path");
  console.log(req.body);

  try {
    const fileres = await fileupload(req.file.path, "Product");
    // console.log("filers", fileres);
    // console.log(fileres.public_id , fileres.url, "bhksv");

    const product = await Products.create({
      ...req.body,
      product_img: {
        public_id: fileres.public_id,
        url: fileres.url,
      },
    });

    console.log(product);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Products cannot be created.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Product data created.",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const updateproducts = async (req, res) => {
  console.log("update products");
  console.log(req.body);
  console.log(req.file);

  try {

    const productId = req.params.product_id;
    console.log("Updating Product ID:", productId);

    let updatedData = { ...req.body };
    console.log(updatedData);


    if (req.file) {
        const productImage = await foldername(req.file.path,"Product");
        console.log("New Product Image Upload Response:", productImage);


        updatedData.product_img = {
            public_id: productImage.public_id,
            url: productImage.url
        };

    }

    const product = await Products.findByIdAndUpdate(
        productId,
        { $set: updatedData }, 
        { new: true, runValidators: true }
    );

    console.log("Updated Product:", product);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found.'
        });
    }
    res.status(200).json({
        success: true,
        message: 'Product updated successfully.',
        data: product
    });
} catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error. ' + error.message
    });
}

//   try {
//     //     const product = await Products.
//     //     findByIdAndUpdate(
//     //         req.params.product_id,
//     //         req.body,
//     //         { new: true, runValidators: true }
//     //     );

//     //     if (!product) {
//     //         return res.status(400).json({
//     //             success: false,
//     //             message: "Product data not found."
//     //         });
//     //     }

//     //     res.status(200).json({
//     //         success: true,
//     //         message: "Product updated successfully.",
//     //         data: product
//     //     });
//     // } catch (error) {
//     //     res.status(500).json({
//     //         success: false,
//     //         message: "Internal server error: " + error.message
//     //     });
//     // }

//     const proid = req.params.id;

//     let datanew = "";

//     if (req.file) {

//         console.log("file upload");
//       const file = await uploadfile("Product", req.file.path);

//       datanew = {
//         ...req.body,
//         product_img: {
//           public_id: file.public_id,
//           url: file.url,
//         },
//       };
//     } else {
//         console.log("filenoooooooooot upload");

//       datanew = req.body;
//     }

//     const updatedProducts = await Products.findByIdAndUpdate(proid, datanew, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedProducts) {
//       return res.status(404).json({
//         success: false,
//         message: "Products not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Products updated successfully",
//       data: updatedProducts,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error: " + error.message,
//     });
//   }
};

const deleteproducts = async (req, res) => {
  console.log("delete products");

  try {
    const product = await Products.findById(req.params.product_id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product data not found.",
      });
    }

    await Products.findByIdAndDelete(req.params.product_id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const countcategory = async (req, res) => {
  try {
    const aggregatedData = await Products.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: "$category"
      },
      {
        $group: {
          _id: "$_id",
          Category_name:{$first: "$category.name"},
          Productname: {$first: "$name"},
          sum: {
            $sum: 1
          }
        }
      }
    ]);

    res.json(aggregatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  listproducts,
  addproducts,
  updateproducts,
  deleteproducts,
  countcategory
};
  