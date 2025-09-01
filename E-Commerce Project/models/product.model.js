const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [{
        type: String
    }],
    price: {
        type: Number,
        required: true,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, { timestamps: true })

const Product = mongoose.model("product", productSchema);
module.exports = Product;