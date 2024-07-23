const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        order_id:{
            type:mongoose.Types.ObjectId,
            ref:"Order",
            required:true
        },
        type:{
            type:String,
            required:true
        },
        status:{
            type:Boolean,
            default:false
        },
    },
    {
        timestamps: true,
        versionKey:false
    }
)

const Payment = mongoose.model("Payment",paymentSchema);
module.exports = Payment;