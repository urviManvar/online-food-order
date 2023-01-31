import { userModel } from "../../model/user/loginModel.js";
export class classController {
  //getUser
  static getUser = async (req, res) => {
    const body = req.body;
    try {
      const data = await userModel.find();
      if (data)
        res.status(200).send({ Message: "Admin Successfully Get", user: data });
      else
        return res.status(400).send({ Message: "Get Admin Error In Database" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  //updateUser
  // static updateUser = async (req, res) => {
  //   let id = req.params.id;
  //   try {
  //     const isExist = await userModel.find();
  //     if (isExist.length > 0) {
  //       const data = await userModel.findOneAndUpdate({ _id: id }, req.body);
  //       if (data)
  //         res.status(200).send({ message: "Admin Successfully Updated" });
  //     } else
  //       return res
  //         .status(400)
  //         .send({ message: "Admin With The Specified Id Does Not Exists" });
  //   } catch (error) {
  //     return res.status(500).send({ message: error.Message });
  //   }
  // };
  //deleteUser
  static deleteUser = async (req, res) => {
    let id = req.params.id;
    try {
      let response = await userModel.findOneAndDelete({ _id: id });
      if (response) {
        return res.status(200).send({ message: "Admin Successfully Delete" });
      }
      return res
        .status(404)
        .send({ message: "Admin With The Specified Id Does Not Exists" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

}
