
  //loginUser
import { userModel } from "../../model/user/loginModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bcryptjs from "bcryptjs";

export class adminController {
  
  
  static loginAdmin = async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body;
      if (!userEmail || !userPassword)
        return res.send({ message: "something went wrong" });
      const data = await userModel.findOne({ userEmail });
      // const isMatch = bcrypt.compare(req.body.Password, userEmail.userPassword);
      // if(isMatch){
      //   res.status(201).render("index");
      // }
      console.log("data :>> ", data);
      if (!data) return res.send({ message: "user not found" });
  
     if (data && data.userPassword == userPassword) {
        const accessToken = jwt.sign(
          { _id: data._id },
          process.env.JWT_TOKEN_KEY,
          { expiresIn: "6d" }
        );
        const userData = {
          id: data._id,
          userName: data.userName,
          token: accessToken,
        };
        return res.send({
          success: true,
          message: "login successfully admin",
          data: userData,
        });
      }
      return res.send({ message: "incorrect password" });
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  };
}