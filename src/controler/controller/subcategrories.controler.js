const Subcategories = require("../model/subcategories.model");

const listsubcategories = async (req, res) => {
    try {
        const Subcategory = await Subcategories.find();
        console.log(Subcategory);

        if (!Subcategory || Subcategory.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Sub-Categories data not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Sub-Categories data fetched.',
            data: Subcategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
}

const getsubcategory = async (req, res) => {
    try {
        const Subcategory = await Subcategories.findById(req.params.subcategory_id);
        console.log(Subcategory);

        if (!Subcategory) {
            return res.status(404).json({
                success: false,
                message: 'Sub-Categories data not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Sub-Categories data fetched.',
            data: Subcategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
}

const addsubcategories = async (req, res) => {
    // console.log("post");
    try {
        const newSubcategory = new Subcategories(req.body);
        const savedSubcategory = await newSubcategory.save();

        res.status(201).json({
            success: true,
            message: 'Sub-Category added successfully.',
            data: savedSubcategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
}

const updatesubcategories = async (req, res) => {
    try {
        const subcategory = await Subcategories.findByIdAndUpdate(
            req.params.subcategory_id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!subcategory) {
            return res.status(404).json({
                success: false,
                message: 'Sub-Categories data not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Sub-Categories updated successfully.',
            data: subcategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
}

const deletesubcategories = async (req, res) => {
    try {
        const Subcategory = await Subcategories.findById(req.params.subcategory_id);

        if (!Subcategory) {
            return res.status(404).json({
                success: false,
                message: 'Sub-Categories data not found.'
            });
        }

        await Subcategories.findByIdAndDelete(req.params.subcategory_id);

        res.status(200).json({
            success: true,
            message: 'Sub-Categories deleted successfully.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
}

const listCategoriesID = async (req, res) => {
    try {
        const categoriesList = await Subcategories.find({ category_id: req.params.category_id });
  
        if (!categoriesList || categoriesList.length === 0) {
            return res.status(404).json({
                success: false,
                message: "categoriesList not found"
            });
        }
  
        res.status(200).json({
            success: true,
            message: "categoriesList found",
            data: categoriesList
        });
  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
  }


const countproducts = async (req, res) => {
    try {
      const aggregatedData = await Subcategories.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "subcategory_id",
            as: "products"
          }
        },
        {
          $unwind: "$products"
        },
        {
          $group: {
            _id: "$_id",
            subcategory_name: {$first: "$name"},
            products_count: {
              $sum: 1
            }
          }
        },
        {
          $project: {
            _id: 0
          }
        }
      ]);
  
      res.json(aggregatedData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
} 

  

module.exports = {
    listsubcategories,
    addsubcategories,
    updatesubcategories,
    deletesubcategories,
    getsubcategory,
    listCategoriesID,
    countproducts
}
