import { brandModel } from "../../model/admin/brandModel.js";
export class brandController {
  //addBrand
  static addBrand = async (req, res) => {
    const { productId, categoryId, brandName } = req.body;
    try {
      const data = await brandModel.create({
        productId: productId,
        categoryId: categoryId,
        brandName: brandName,
      });
      if (data) res.status(200).send({ message: "Brand Successfully Add" });
      else
        return res
          .status(400)
          .send({ message: "AddBrand user Error In Database" });
    } catch (error) {
      console.log("error:>>>", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };

  //updateBrand
  static updateBrand = async (req, res) => {
    let id = req.params.id;
    try {
      const isExist = await brandModel.find();
      if (isExist.length > 0) {
        const data = await brandModel.findOneAndUpdate({ _id: id }, req.body);
        if (data)
          res.status(200).send({ message: "Brand Successfully Updated" });
      } else
        return res.status(400).send({
          message: "UpdateBrand With The Specified Id Does Not Exists",
        });
    } catch (error) {
      return res.status(500).send({ message: error.Message });
    }
  };

  //deleteBrand
  static deleteBrand = async (req, res) => {
    let id = req.params.id;
    try {
      let response = await brandModel.findOneAndDelete({ _id: id });
      if (response) {
        return res.status(200).send({ message: "Brand Successfully Delete" });
      }
      return res
        .status(404)
        .send({ message: "DeleteBrand With The Specified Id Does Not Exists" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}
