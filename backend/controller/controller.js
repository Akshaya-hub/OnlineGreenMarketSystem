import bcryptjs from 'bcryptjs';
import {User} from '../models/model.js';
import { generateToken } from '../utils/generatetoken.js';



export const signup = async (req,res)=>{
    const {name, email, address,contactNo, password} = req.body;
    try {
        if(!name || !email || !address || !contactNo || !password){
            throw new Error("All fields are required");
        }

       
        const userAlreadyExistes = await User.findOne({email});
        if(userAlreadyExistes){
            return res.status(400).json({success:false, message:"User already Exists"});
        }

        const hashedPassword = await bcryptjs.hash(password,10)
        const verificationToken = Math.floor(100000 + Math.random()*900000).toString();

        const user = new User({
            name,
            email,
            address,
            contactNo,
            password: hashedPassword,
            verificationToken,
            verificatonTokenExpiresAt: Date.now() + 24*60*60*1000

        })
        await user.save();

        generateToken(res, user._ID);
        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                ...user._doc,
                password:undefined,
            },
        })

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const login = async (req,res)=>{
    res.send("login route")
}

export const logout = async (req,res)=>{
    res.send("logout route")
}