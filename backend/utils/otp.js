import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL, // Your email
        pass: process.env.GPASS  // Your email password
    }
});

// Send OTP via email
export const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP:', error);

        console.error('Error sending OTP:', error);
        throw new Error('Error sending OTP');
    }
};




