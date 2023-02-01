import { userModel } from "../../model/user/loginModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export class classController {
  //addUser
  static addUser = async (req, res) => {
      const { userName, userMobile, userEmail, userPassword } = req.body;
      try {   
       const data = await userModel.create({
          userName: userName,
          userMobile: userMobile,
          userEmail: userEmail,
          userPassword: userPassword
        });
        const salt = await bcrypt.genSalt(10);
        data.userPassword = await bcrypt.hash(data.userPassword, salt);
        await data.save();

        if (data) res.status(200).send({ message: "user  Successfully signup" });
        else
          return res.status(400).send({ message: "Add user Error In Database" });
      } catch (error) {
        console.log("error:>>>", error);
        return res.status(500).send({ message: "Internal Server Error" });
      }
    };


    //get user
 static getUser = async (req, res) => {
    const body = req.body;
    try {
      const data = await userModel.find();
      if (data)
        res.status(200).send({ Message: "user Successfully Get", user: data });
      else
        return res.status(400).send({ Message: "Get user Error In Database" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  //updateUser
  static updateUser = async (req, res) => {
    let id = req.params.id;
    try {
      const isExist = await userModel.find();
      if (isExist.length > 0) {
        const data = await userModel.findOneAndUpdate({ _id: id }, req.body);
        if (data)
          res.status(200).send({ message: "user Successfully Updated" });
      } else
        return res
          .status(400)
          .send({ message: "user With The Specified Id Does Not Exists" });
    } catch (error) {
      return res.status(500).send({ message: error.Message });
    }
  };
  //deleteUser
  // static deleteUser = async (req, res) => {
  //   let id = req.params.id;
  //   try {
  //     let response = await userModel.findOneAndDelete({ _id: id });
  //     if (response) {
  //       return res.status(200).send({ message: "Admin Successfully Delete" });
  //     }
  //     return res
  //       .status(404)
  //       .send({ message: "Admin With The Specified Id Does Not Exists" });
  //   } catch (error) {
  //     return res.status(500).send({ message: error.message });
  //   }
  // };

  //sign up
  static sign_up = async (req, res) => {
    try {
        const user = new userModel({
            userName: req.body.userName,
            userMobile: req.body.userMobile,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
        })
        const salt = await bcrypt.genSalt(10);
        user.userPassword = await bcrypt.hash(user.userPassword, salt);
        await user.save();
        const userData = await user.save();
        console.log('userData :>> ', userData);
        return res.status(200).send("data saved successfully");
    } catch (error) {
        console.log('error :>> ', error);
    }
}


  //loginUser
  static loginUser = async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body;
      if (!userEmail || !userPassword)
        return res.send({ message: "something went wrong" });
      const data = await userModel.findOne({ userEmail });
      const isMatch = await bcrypt.compare(
        String(userPassword),
        data.userPassword
      );
      console.log("isMatch",isMatch)
      if(!isMatch) {
        return res.send("wrong password");
      }
        const accessToken = jwt.sign(
          { _id: data._id },
          process.env.JWT_TOKEN_KEY,
          { expiresIn: "6d" }
        );
        return res.send({
          success: true,
          message: "login successfully",
          token:accessToken,
        });
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  };
};
