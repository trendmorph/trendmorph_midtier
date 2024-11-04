// utils/otpUtil.js
const nodemailer = require("nodemailer");

// Use environment variables for sensitive information
const supportEmail = process.env.SUPPORT_EMAIL;
const supportPassword = process.env.SUPPORT_PASSWORD;

// OTP storage with expiration times
let otps = {};

// Generate OTP
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
        user: supportEmail,
        pass: supportPassword,
    },
});

// Store OTP with expiration
const storeOtp = (email, otp, ttl = 600000) => { // TTL default is 10 minutes
    const expires = Date.now() + ttl;
    otps[email] = { otp, expires };
};

// Validate OTP with expiration
const isValidOtp = (email, otp) => {
    const otpData = otps[email];
    if (otpData && otpData.otp === otp && Date.now() < otpData.expires) {
        delete otps[email]; // Clear OTP after successful verification
        return true;
    }
    return false;
};

// Send OTP email
const sendOtpToEmail = async (email) => {
    if (!email) throw new Error("Email is required.");

    const otp = generateOtp();
    storeOtp(email, otp); // Store OTP with expiration

    const mailOptions = {
        from: `"Trendmorph Support" <${supportEmail}>`,
        to: email,
        subject: 'Trendmorph || Your One-Time Password (OTP)',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fff;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="cid:logo" alt="Trendmorph Logo" style="width: 150px;"/>
                </div>
                <h2 style="text-align: center; color: #f47629;">Trendmorph</h2>
                <p style="font-size: 16px; text-align: center;">Hello,</p>
                <p style="font-size: 18px; text-align: center; font-weight: bold;">Your One-Time Password (OTP):</p>
                <p style="font-size: 22px; text-align: center; font-weight: bold; color: #f47629;">${otp}</p>
                <p style="font-size: 16px; text-align: center;">This OTP is valid for the next 10 minutes. Please do not share it with anyone for security reasons.</p>
                <p style="font-size: 14px; text-align: center; color: #888;">If you did not request this OTP, please ignore this email.</p>
                <hr style="border: none; height: 1px; background-color: #e0e0e0; margin: 20px 0;" />
                <p style="font-size: 14px; text-align: center; color: #888;">Need help? Contact our <a href="mailto:${supportEmail}" style="color: #f47629; text-decoration: none;">support team</a>.</p>
                <p style="font-size: 14px; text-align: center; color: #888;">© ${new Date().getFullYear()} Trendmorph. All rights reserved.</p>
            </div>
        `,
        attachments: [
            {
                filename: 'logo.png',
                path: './assets/images/logo.png',
                cid: 'logo'
            }
        ]
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    return "OTP sent successfully.";
};

// Verify OTP
const verifyOtp = async (email, otp) => {
    if (!email || !otp) throw new Error("Email and OTP are required.");
    if (isValidOtp(email, otp)) {
        return "OTP verified.";
    }
    throw new Error("Invalid or expired OTP.");
};

module.exports = {
    sendOtpToEmail,
    verifyOtp
};
