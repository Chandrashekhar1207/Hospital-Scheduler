import DoctorModel from "../models/docterModel.js";
import jwt from "jsonwebtoken";



export const DoctorCreate = async (req , res) => {
    const {
      name,
      email,
      password,
      phone,
      age,
      gender,
      specialization,
      experience,
      degree,
      address
    } = req.body;

    if (
      (!name || !email || !password || !phone || !age,
      !gender,
      !specialization,
      !experience,
      !degree,
      !address)
    ) {
      return res.status(422).json({ message: "Please fill all the fields" });
    }

    try {
        const doctorExist = await DoctorModel.findOne({
            email,
        })

        if(doctorExist)
        {
            return res.status(422).json({message : "Doctor already exists"});
        }

        const doctor = new DoctorModel({
          name,
          email,
          password,
          phone,
          gender,
          specialization,
          experience,
          degree,
          address,
        });
        await doctor.save();
        res.status(200).json({message : "Doctor registered successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: " error while creating doctor" });
    }
}


export const DoctorLogin = async (req , res) =>{
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(422).json({ message: "Please fill all the fields" });
    }

    try {
        const doctorExist = await DoctorModel.findOne({
            email,
            password
        })

        if(!doctorExist){
            return res.status(422).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({id : doctorExist._id},"secret");

        return res.status(200).json({message : "Doctor logged in successfully" , token : token ,
        doctor : {
            id : doctorExist._id,
            email : doctorExist.email,
            name : doctorExist.name,
        }
    })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: " error while logging in doctor" });
    }
}



