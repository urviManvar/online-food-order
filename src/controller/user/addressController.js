import { addressModel } from "../../model/user/addressModel.js";

export class addressController {
  //addAddress
  static addAddress = async (req, res) => {
    const { userId, City, District, Pincode, Address } = req.body;
    console.log("req.body :>> ", req.body);
    try {
      const data = await addressModel.create({
        userId: userId,
        City: City,
        District: District,
        Pincode: Pincode,
        Address: Address,
      });
      console.log(" data:>> ", data);
      if (data)
        return res
          .status(200)
          .send({ message: "user  Successfully AddAddress" });
      else
        return res
          .status(400)
          .send({ message: "AddAddress user Error In Database" });
    } catch (error) {
      console.log("error:>>>", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
  //updateAddress
  static updateAddress = async (req, res) => {
    let id = req.params.id;
    try {
      const isExist = await addressModel.find();
      if (isExist.length > 0) {
        const data = await addressModel.findOneAndUpdate({ _id: id }, req.body);
        if (data)
          res.status(200).send({ message: "user Successfully UpdatedAddress" });
      } else
        return res
          .status(400)
          .send({ message: "user With The Specified Id Does Not Exists" });
    } catch (error) {
      return res.status(500).send({ message: error.Message });
    }
  };
  //getAddress
  static getAddress = async (req, res) => {
    const body = req.body;
    try {
      const data = await addressModel.find(body);
      if (data)
        res
          .status(200)
          .send({ Message: "user Successfully GetAddress", user: data });
      else
        return res
          .status(400)
          .send({ Message: "GetAddress Admin Error In Database" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  //deleteAddress
  static deleteAddress = async (req, res) => {
    let id = req.params.id;
    try {
      let response = await addressModel.findOneAndDelete({ _id: id });
      if (response) {
        return res
          .status(200)
          .send({ message: "user Successfully DeleteAddress" });
      }
      return res
        .status(404)
        .send({ message: "user With The Specified Id Does Not Exists" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}
