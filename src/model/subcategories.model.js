const mongoose = require("mongoose");


const subcategoriesSchema = new mongoose.Schema({
    categories_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    image: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: true
    },

},
    {
        timestamps: true,
        versionKey: false
    },
)

const Subcategories =  mongoose.model("Subcategories",subcategoriesSchema);
module.exports = Subcategories;