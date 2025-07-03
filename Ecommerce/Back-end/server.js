// // server.js
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const Product = require('./models/Product')
const categoryRoutes = require("./routes/category");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"))


mongoose.connect('mongodb+srv://arjun:12345@cluster0.uw9hlyy.mongodb.net/')
  .then(() => console.log("MongoDB connection is done"))
  .catch(() => console.log("Connection fail"))


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
})

const upload = multer({ storage })

// app.get('/api', (req, res) => {
//   res.send('Hello World!')
// })

app.post('/api/add/product', upload.single("image"), async (req, res) => {

  const { name, price, des } = req.body;

  const product = new Product({
    name,
    price,
    description: des,
    image: req.file?.filename
  })
  await product.save()
  console.log("req.body ====>", req.body)
  res.json(product)
})

app.get('/api/add/product',async(req,res)=>{
  const product = await Product.find();

  res.json(product);
})


app.use('/api/categories',categoryRoutes)


const nodemailer = require('nodemailer');

// In-memory OTP store (for demo purposes only)
let otpStore = {};

// Nodemailer Transport Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'easys8560@gmail.com',           // Replace with your Gmail
    pass: 'dvul ppot hzxm szue'            // Use a Gmail App Password
  }
});

// 1. Send OTP Endpoint
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: '"Easy Shop" <easys8560@gmail.com>',
      to: email,
      subject: 'Your OTP Code',
      text: `Your One-Time Password (OTP) is: ${otp}`,
    });

    console.log(`OTP sent to ${email}: ${otp}`);
    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// 2. Verify OTP Endpoint
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  console.log('Verifying OTP for:', email);
  console.log('Expected OTP:', otpStore[email]);
  console.log('Received OTP:', otp);

  if (!otpStore[email]) {
    return res.status(400).json({
      success: false,
      message: 'No OTP found for this email. Please request a new one.',
    });
  }

  if (otpStore[email] !== otp) {
    return res.status(400).json({
      success: false,
      message: 'Invalid OTP. Please check and try again.',
    });
  }

  // OTP is correct
  delete otpStore[email];

  // Send login success email with image
  try {
    await transporter.sendMail({
      from: '"Easy Shop" <easys8560@gmail.com>',
      to: email,
      subject: '🎉 Login Successful - Happy Shopping!',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>🎉 Congratulations!</h2>
          <p>You have successfully logged in to <strong>Easy Shop</strong>.</p>
          <p>We wish you a wonderful shopping experience. 🛒</p>
          <br/>
          <p>Best regards,<br/>Easy Shop Team</p>
          <hr style="margin: 20px 0;" />
          <div style="text-align: center;">
            <img src="https://dynamic.design.com/preview/design/f0227b0e-e99c-49fb-bf0a-876153a0b900"
                 alt="Happy Shopping"
                 style="max-width: 100%; height: auto; border-radius: 8px;" />
          </div>
        </div>
      `
    });

    console.log(`Login confirmation sent to ${email}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Do not block response if email fails
  }

  res.json({
    success: true,
    message: 'OTP verified successfully. You are logged in.',
  });
});


// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
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

    // Check if category exists
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



// PUT /api/add/product/:id
app.put('/api/add/product/:id', upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id; // keep as string (MongoDB ObjectId)
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      des: req.body.des,
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
    res.status(500).json({ message: 'Failed to save product', error: error.message });
  }
});

// DELETE /api/add/product/:id

// Assuming you already required express, mongoose, and your Product model

app.delete('/api/add/product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});



// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



