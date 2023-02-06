import { categoryModel } from "../../model/admin/categoryModel.js";

export class categoryController {
  static addCategory = async (req, res) => {
    const { categoryName } = req.body;
    try {
      //  console.log(body);
      const data = await categoryModel.create({
        categoryName: categoryName,
      });

      if (data)
        res.status(200).send({ message: "categoryName  Successfully add" });
      else
        return res
          .status(400)
          .send({ message: "Add categoryName Error In Database" });
    } catch (error) {
      console.log("error:>>>", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };

  static getCategory = async (req, res) => {
    const body = req.body;
    try {
      //  console.log(body);
      const data = await categoryModel.find();
      if (data)
        res
          .status(200)
          .send({ Message: "category Successfully Get", user: data });
      else
        return res.status(400).send({ Message: "Get user Error In Database" });
    } catch (error) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };

  static updateCategory = async (req, res) => {
    let id = req.params.id;
    const body = req.body;
    try {
      // console.log(body);
      let response = await categoryModel.findOneAndUpdate({ _id: id }, body);
      if (response) {
        return res
          .status(200)
          .send({ message: "category Successfully update" });
      }
      return res
        .status(404)
        .send({ message: "category With The Specified Id Does Not Exists" });
    } catch (error) {
      console.log("error:>>", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
  static deleteCategory = async (req, res) => {
    let id = req.params.id;
    try {
      let response = await categoryModel.findOneAndDelete({ _id: id });
      if (response) {
        return res
          .status(200)
          .send({ message: "category Successfully Delete" });
      }
      return res
        .status(404)
        .send({ message: "category With The Specified Id Does Not Exists" });
    } catch (error) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
