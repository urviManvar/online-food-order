import { brandModel } from "../../model/admin/brandModel.js";
export class brandController {
  static getBrand = async (req, res, next) => {
    try {
      const data = await brandModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
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
