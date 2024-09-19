import bcryptjs from 'bcryptjs';
import { User } from '../models/model.js';
import { generateOTP, generateToken } from '../utils/generatetoken.js';
import { sendOTPEmail } from '../utils/otp.js';

// Signup function (send OTP, don't save the user yet)
export const signup = async (req, res) => {
    const { name, email, address, contactNo, password } = req.body;
    
    try {
        // Validate required fields
        if (!name || !email || !address || !contactNo || !password) {
            throw new Error("All fields are required");
        }

        // Check if user already exists
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Generate OTP
        const otp = generateOTP();
        const otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

        // Store the user data in the session (or temporarily)
        req.session.tempUserData = {
            name,
            email,
            address,
            contactNo,
            password: hashedPassword,
            otp,
            otpExpiresAt
        };

        // Send OTP to user's email
        await sendOTPEmail(email, otp);

        res.status(200).json({
            success: true,
            message: "OTP sent to your email. Please verify the OTP to complete the registration."
        });

    } catch (error) {
        console.error("Error in signup:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const verifySignup = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Check if temporary user data exists
        const tempUserData = req.session.tempUserData;
        if (!tempUserData || tempUserData.email !== email) {
            return res.status(400).json({ success: false, message: "Invalid email or session expired" });
        }

        // Check if OTP is correct and not expired
        const { otp: storedOtp, otpExpiresAt } = tempUserData;
        if (otp !== storedOtp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if (Date.now() > otpExpiresAt) {
            return res.status(400).json({ success: false, message: "OTP has expired" });
        }

        // If OTP is valid, save the user to the database
        const newUser = new User({
            name: tempUserData.name,
            email: tempUserData.email,
            address: tempUserData.address,
            contactNo: tempUserData.contactNo,
            password: tempUserData.password,
            isVerified: true
        });
        await newUser.save();

        // Generate and send JWT token
        generateToken(res, newUser._id);

        // Clear session data after success
        req.session.tempUserData = null;

        res.status(201).json({
            success: true,
            message: "Email verified successfully. You are now registered."
        });

    } catch (error) {
        console.error("Error in verifySignup:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate required fields
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Verify password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Generate and send JWT token
        generateToken(res, user._id);

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                // Add any other user data you want to return
            }
        });

    } catch (error) {
        console.error("Error in login:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (req,res)=>{
    res.send("logout route")
}