const express = require("express");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();


// // Middleware
// app.use(bodyParser.json());

// // Enable CORS for all origins or for specific origin (like http://localhost:3000)
app.use(cors({
    origin: "http://localhost:3000", // Allow only the React app running at port 3000
    methods: "GET,POST", // Allow only these methods
    credentials: true // Allow cookies to be sent if needed
}));

// // In-memory storage for OTP (For production, use a database or cache)
// let otps = {};

// const supportEmail = "support@trendmorph.com"
// const supportPassword = "x8%ea&BwkAaD73H1209"
// // Generate OTP
// function generateOtp() {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// }

// // Set up nodemailer transporter
// const transporter = nodemailer.createTransport({
//     host: 'smtp.hostinger.com', // Hostinger SMTP host
//     port: 465, // Port 465 for SSL, use 587 for TLS
//     secure: true, // True for SSL, false for TLS (use port 587 for TLS)
//     auth: {
//         user: supportEmail, // Your email
//         pass: supportPassword   // Your email password or app-specific password if using Gmail 2FA
//     }
// });

// // Send OTP API (via email)
// app.post("/api/send-otp", (req, res) => {
//     console.log('hitting')
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ success: false, message: "Email is required." });
//     }

//     const otp = generateOtp();
//     otps[email] = otp; // Store OTP in memory (for demo purposes)

//     // Set up email data with unicode symbols
//     const mailOptions = {
//         from: `"One Time Passowrd" ${supportEmail}`, // Sender address
//         to: email, // Recipient's email
//         subject: 'Trendmorph || Your OTP Code', // Subject line
//         // text: `DO NOT SHARE OTP!!! Your One Time Pasword is: ${otp}`, // Plain text body
//         html: `<b>DO NOT SHARE OTP!!! Your One Time Pasword is: ${otp}</b>` // HTML body
//     };

//     // Send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error("Error sending OTP via email:", error);
//             return res.status(500).json({ success: false, message: "Failed to send OTP via email." });
//         }
//         console.log(`OTP sent to ${email}: ${otp}`);
//         return res.json({ success: true, message: "OTP sent via email." });
//     });
// });

// // Verify OTP API
// app.post("/api/verify-otp", (req, res) => {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//         return res.status(400).json({ success: false, message: "Email and OTP are required." });
//     }

//     // Check if OTP matches
//     if (otps[email] === otp) {
//         return res.json({ success: true, message: "OTP verified." });
//     } else {
//         return res.status(400).json({ success: false, message: "Invalid OTP." });
//     }
// });

// Start server
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api/v1/auth', authRoutes); // All auth-related routes
app.use('/api/v1/user', userRoutes); // All user-related routes

app.use('/api/v1/products', productRoutes); // Use the product routes

app.use('/api/v1/orders', orderRoutes); // Use the product routes

app.use('/api/v1/cart', cartRoutes); // Use the cart routes

app.use('/api/v1/wishlist', wishlistRoutes); // Use the wishlist routes

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
