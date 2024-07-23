const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb+srv://parthsaliya66:B6OrIF6i2fynZUyx@parth010.h918wtj.mongodb.net/ecommerce')
        .then(()=> console.log("connected to mongodb"))
        .catch((error)=>{
            console.log("error", error);
    });
    
} catch (error) {
    console.log("error", error);
    }
}

module.exports = connectdb;