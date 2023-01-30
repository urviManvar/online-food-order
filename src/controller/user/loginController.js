import { userModel } from "../../model/user/loginModel.js";
import jwt from "jsonwebtoken";

export class classController {
  //addUser
  static addUser = async (req, res) => {
    //console.log ('req.body',req.body)
    const body = req.body;
    try {
      console.log(body);
      const data = await userModel.create(body);
      console.log(data);
      if (data) res.status(200).send({ message: "user Successfully Added" });
      else
        return res.status(400).send({ message: "Add user Error In Database" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  //getUser
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

  //loginUser
  static loginUser = async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body;
      if (!userEmail || !userPassword)
        return res.send({ message: "something went wrong" });
      const data = await userModel.findOne({ userEmail });
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
          message: "login successfully",
          data: userData,
        });
      }
      return res.send({ message: "incorrect password" });
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  };
}
