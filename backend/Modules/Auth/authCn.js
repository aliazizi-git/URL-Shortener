import { catchAsync, HandleERROR } from "vanta-api";
import User from "../User/userMd.js";
import bcrypt from "bcryptjs";
import JWT from 'jsonwebtoken'
export const register = catchAsync(async (req, res, next) => {
  const { role = "user", password, ...otherData } = req.body;
  const isExist = await User.findOne({
    $or: [{ username: otherData.username }, { email: otherData.email }],
  });
  if (isExist) {
    return next(new HandleERROR("username or email already exists", 400));
  }
  const passReg = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  );
  if (!passReg.test(password)) {
    return next(
      new HandleERROR(
        "password must contain at least one uppercase letter, one lowercase letter, and one number",
        400,
      ),
    );
  }
  const hashPass = bcrypt.hashSync(password, 10);
  const user = await User.create({
    ...otherData,
    password: hashPass,
    role,
  });
  return res.status(200).json({
    success: true,
    message: "user created successfully",
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const isExist = await User.findOne({
    $or:[
        {username:username},
        {email:username}
    ]
  });
  if (!isExist) {
    return next(new HandleERROR("invalid username or password", 400));
  }
  const isMatch = bcrypt.compareSync( password,isExist.password);
  if (!isMatch) {
    return next(new HandleERROR("invalid username or password", 400));
  }
  const token = JWT.sign({id:isExist._id , role:isExist.role},process.env.JWT_SECRET,{expiresIn: "1d"})
  const finalUser = await User.findById(isExist._id).select("-password")
  return res.status(200).json({
    success:true,
    message:"user login successfully",
    data:{
        token,
        user:finalUser
    }
  })
});
