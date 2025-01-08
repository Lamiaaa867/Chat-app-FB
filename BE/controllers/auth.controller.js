import { userModel } from "../DB/models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/generateToken.js";

//////////////////////////signup api//////////////////////
export const signUp = async (req, res, next) => {
    console.log(req.body)
  const { userName,gender, password } = req.body;

  const isUserExist = await userModel.findOne({ userName});
  if (isUserExist) {
    return res.status(409).json({ message: "Email already exists" });
  }
  const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${userName}`
 const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${userName}`
  const hashedPass = bcrypt.hashSync(password, +process.env.saltRounds);
  const userInstance = new userModel({
    userName,
    gender,
    password: hashedPass,
    profilePicture :gender==='male'?boyProfilePic:girlProfilePic
  });
if(userInstance){
  await generateToken(userInstance._id,res)

  await userInstance.save()   
  return res
  .status(201)
  .json({ message: "User created successfully", user: userInstance });

}
return res
.status(400)
.json({ message: "invalid user data"});

 };
 //==============login
export const logIn = async (req, res, next) => {
  const { userName, password } = req.body;
  const isUserExist = await userModel.findOne({ userName});
  if (!isUserExist||!isUserExist) {
    return res.status(409).json({ message: "Email not found, please sign up" });
  }
  const isMatch = bcrypt.compareSync(password, isUserExist.password);
  if (!isMatch) {
    return res.status(409).json({ message: "Wrong password" });
  }
 await generateToken(isUserExist._id,res)
  return res.status(200).json({
    message: "Login successful",
    user: isUserExist,
  });
};
//========log out
export const logOut = async (req, res, next) => {
     res.cookie("jwt","",{maxAge:0})
     return res.status(200).json({
        message: "Logged out succesful",
       
      });
  };