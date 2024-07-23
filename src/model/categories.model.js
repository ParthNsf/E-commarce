const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
    { 
        name:{
            type: String,
            required: true,
            unique: true,
            trim:true,
            lowercase:true
        },
        description:{
            type: String,
            required: true,
            trim:true,
            lowercase:true
        },
        image:{
            type: String,
        },
        is_active:{
            type:Boolean,
            default:true
        }

    },
    {
        timestamps: true,
        versionKey:false
    }
);

const Categories = mongoose.model("Categories",categoriesSchema);
module.exports = Categories;