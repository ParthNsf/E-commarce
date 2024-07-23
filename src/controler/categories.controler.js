const Categories = require("../model/categories.model")

const listcategories = async (req,res) => {
    try {
        console.log("njrsg ");
        const category = await Categories.find();
        console.log(category);

        if (!category || category.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Categories data not found.'
            })
        }

        res.status(200).json({
            success: false,
            message: 'Categories data fetched.',
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'+ error.message
        })
    }
}

const getcategory = async (req,res) => {

    try {
        const aggregatedData = await Category.aggregate([
          // Your aggregation pipeline stages go here
          // Example:
          { $group: { _id: '$category', totalProducts: { $sum: 1 } } }
        ]);
    
        res.json(aggregatedData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    


    // try {
    //     console.log(req.params.category_id);
    //     const category = await Categories.findById(req.params.category_id);
    //     console.log(category);

    //     if (!category) {
    //         res.status(404).json({
    //             success: false,
    //             message: 'Categories data not found.'
    //         })
    //     }

    //     res.status(200).json({
    //         success: false,
    //         message: 'Categories data fetched.',
    //         data: category
    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: 'Internal server error'+ error.message
    //     })
    // }
}

const addcategories = async (req,res) => {
    try {
        console.log(req.body);
        const category = await Categories.create(req.body);
        console.log(category);

        if (!category) {
            res.status(400).json({
                success: false,
                message: 'Categories can not create.'
            })
        }

        res.status(201).json({
            success: false,
            message: 'Categories data created.',
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'+ error.message
        })
    }
}

const updatecategories = async (req,res) => {
    try {
        console.log(req.params.category_id);
        const category = await Categories.findByIdAndUpdate(req.params.category_id,req.body,{new: true, runValidators: true})


        if (!category) {
            res.status(400).json({
                success: false,
                message: 'Categories data not found.'
            })
        }

        res.status(200).json({
            success: false,
            message: 'Categories Updated Successfully.',
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'+ error.message
        })
    }
}

const deletecategories = async (req,res) => {
    try {
        console.log(req.params.category_id);
        const category = await Categories.findById(req.params.category_id);

        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Categories data not found.'
            })
        }

        const data = await Categories.findByIdAndDelete(req.params.category_id)

        res.status(200).json({
            success: false,
            message: 'Categories Deleted Successfully.',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'+ error.message
        })
    }
}

const countsubcategory = async (req, res) => {
    try {
      const aggregatedData = await Categories.aggregate([
        {
          $lookup: {
            from: "subcategories", 
            localField: "_id",
            foreignField: "categories_id",
            as: "data"
          }
        },
        {
          $unwind: "$data"
        },
        {
          $group: {
            _id: "$_id",
            category_name: { $first: "$name" },
            subcategory_count: {
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
    listcategories,
    addcategories,
    updatecategories,
    deletecategories,
    getcategory,
    countsubcategory
}


