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

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



