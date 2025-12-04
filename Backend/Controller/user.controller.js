import { User } from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup =  async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "all field required" });
    }

    const hashedPass = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        password: hashedPass
    })
    if(!user){
        return res.status(400).json({ message: "user creation failed" });
    }
    return res.status(201).json({message: "user created",user});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ( !email || !password) {
      return res.status(400).json({ message: "all field required" });
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({ message: "email not found" });
    }

    const matchPass = await bcrypt.compare(password, user.password);
    if(!matchPass){
      return res.status(400).json({message: "password not matched"});
    }
    const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY,{expiresIn: '100d'});

    return res.status(201).json({message: "login successfully",user,token});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "server error" });
  }
}

