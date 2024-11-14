import UserModel from "../models/userModel.js";
import DoctorModel from "../models/docterModel.js";
import jwt from "jsonwebtoken";


export const createUser = async (req , res) =>{
    const { name, email, password,  gender , DOB} = req.body;
    console.log(req.body);
    if(!name || !email || !password  || !gender){
        return res.status(422).json({message : "Please fill all the fields"});
    }
    try {
        const userExist  = await UserModel.findOne({
            email,
        })
        if(userExist){
            return res.status(422).json({message : "User already exists"});
        }
        const user = new UserModel({
            name,
            email,
            password,
            gender,
            DOB,
        })
        await user.save();
        res.status(200).json({message : "User registered successfully"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: " error while creating user" });
    }

}

export const loginUser = async (req , res) =>{
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(422).json({ message: "Please fill all the fields" });
    }

    try {
        const userExist = await UserModel.findOne({
            email,
            password
        })

        if(!userExist){
            return res.status(422).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({id : userExist._id} , "secret");

        return res.status(200).json({message : "User logged in successfully" , token : token ,
        user : {
            id : userExist._id,
            name : userExist.name,
            email : userExist.email,
        }
    });
    } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: " error while logging in user" });
    }
}


export const getallDoctor = async (req, res) => {
    try {
        const doctor = await DoctorModel.find();
        res.status(200).json({ doctor });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: " error while fetching doctors" });
    }
}