const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
  comment: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  des: String,
  image: String,
  brand: String,
  category: String,  // add this
});


// When you create a product, Mongoose automatically adds _id of type ObjectId
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
