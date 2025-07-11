const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

// Models
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');

// Routes
const categoryRoutes = require('./routes/category');

// === Middleware Setup ===
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// === Session Setup ===
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// === MongoDB Connection ===
mongoose.connect('mongodb+srv://arjun:12345@cluster0.uw9hlyy.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB:', err));

// === View Engine ===
app.set('view engine', 'ejs');

// === File Upload Config ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// === Product Endpoints ===

// Add Product
app.post('/api/add/product', upload.single('image'), async (req, res) => {
  try {
    const { name, price, des, category, brand } = req.body;

    const product = new Product({
      name,
      price,
      description: des,
      category,
      brand,
      image: req.file?.filename
    });

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Add Product Error:', error);
    res.status(500).json({ message: 'Failed to save product' });
  }
});

// Get Products
app.get('/api/add/product', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Update Product
app.put('/api/add/product/:id', upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.des,
      category: req.body.category,
      brand: req.body.brand,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
});

// Delete Product
app.delete('/api/add/product/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
});
// POST /api/products/:id/review
app.post('/api/products/:id/review', async (req, res) => {
  const { name, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const newReview = { name, comment, date: new Date() };
  product.reviews = product.reviews || [];
  product.reviews.push(newReview);
  await product.save();

  res.json({ message: 'Review added', product });
});


// === Category Endpoints ===

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new category
app.post('/api/categories', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({ name: name.trim() });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// === OTP Routes ===
let otpStore = {}; // In-memory OTP store

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'easys8560@gmail.com',
    pass: 'dvul ppot hzxm szue'
  }
});

// Send OTP
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: '"Easy Shop" <easys8560@gmail.com>',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`
    });

    console.log(`OTP sent to ${email}: ${otp}`);
    res.json({ success: true, message: 'OTP sent' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Verify OTP
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email]) {
    return res.status(400).json({ success: false, message: 'OTP not found. Please request a new one.' });
  }

  if (otpStore[email] !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  delete otpStore[email];

  // Optionally send success email here...

  res.json({ success: true, message: 'OTP verified successfully' });
});

// === Auth Routes ===

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = {
      username: user.username,
      role: user.role
    };
    return res.redirect('/dashboard');
  } else {
    return res.status(400).send('Invalid username or password');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send('Error logging out');
    res.redirect('/home');
  });
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
