import productModel from "../../model/admin/productModel.js";

export class productDataController {
  static getProductData = async (req, res, next) => {
    try {
      const data = await productModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "product",
          },
        },
      ]);
      console.log("data", data);
      if (data) {
        return res.status(200).send({ Message: "Successfully", data: data });
      }

      return res.status(400).send({ Message: "Get product Error In Database" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}
