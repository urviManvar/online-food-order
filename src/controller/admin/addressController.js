import { addressModel } from "../../model/user/addressModel.js";
export class addressController {
  // //getAddress
  // static getAddress = async (req, res) => {
  //   const body = req.body;
  //   try {
  //     const data = await addressModel.find(body);
  //     if (data)
  //       res
  //         .status(200)
  //         .send({ Message: "Admin Successfully GetAddress", user: data });
  //     else
  //       return res
  //         .status(400)
  //         .send({ Message: "GetAddress Admin Error In Database" });
  //   } catch (error) {
  //     return res.status(500).send({ message: error.message });
  //   }
  // };

  static getAddressData = async (req, res, next) => {
    try {
      const data = await addressModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "addresses",
          },
        },
      ]);
      console.log("data", data);
      if (data) {
        return res.status(200).send({ message: "successfully", data: data });
      }
      res.status(400).send({ message: "Error in database" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}
