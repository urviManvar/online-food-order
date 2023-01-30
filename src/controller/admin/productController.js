import productModel from "../../model/admin/productModel.js";
import {uploadFile,fileUpload} from "../../until/upload.js";
export class productController{

    // static addProduct = async (req, res) => {
    //     try {
    //         const { name,quantity, categoryId, price, stoke } = req.body;
    //         const foundItem = await productModel.findOne({ name });
    //         if (foundItem) return res.send({ massage: "Product Already Exist" });
    //         if (!req.files) return res.send({ massage: "Please Provide Image" });
        
    //         if (!name || !categoryId || !price || !stoke || !quantity)
    //           return res.send({ massage: "Please Provide Product Details" });
    //         const item = new productModel({
    //           name,
    //           categoryId,
    //           price,
    //           stoke,
    //           quantity
    //         });
    //         const file = uploadFile(item._id, req.files.image);
    //         item.image = file;
    //         const productData = await item.save();
    //         return res.status(200).send({
    //           success: true,
    //           massage: "Product Added Successfully",
    //         });
    //       } catch (error) {
    //         res.status({ success: false, message: error.message });
    //       }
    //     };
       
        // static getProduct = async (req, res) => {
        //     try {
        //       const data = await productModel.find();
        //       res.status(200).send({
        //         success: true,
        //         massage: data,
        //       });
        //     } catch (error) {
        //       console.log(error);
          
        //       res.status(400).send({ success: false, message: error.message });
        //     }
        //   };

          static updateProduct = async (req, res) => {
            let id = req.params.id
            const body = req.body
            try {
                // console.log(body);
                let response = await productModel.findOneAndUpdate({ _id: id},body)
                if (response) {
                    return res.status(200).send({message: "product Successfully update"})
                }
                return res.status(404).send({message: "product With The Specified Id Does Not Exists"})
            } catch (error) {
                console.log("error:>>",error);
                return res.status(500).send({message: "Internal Server Error"})
            }
        }

        static deleteProduct = async (req, res) => {
            let id = req.params.id
            try {
                let response = await productModel.findOneAndDelete({ _id: id})
                if (response) {
                    return res.status(200).send({message: "product Successfully Delete"})
                }
                return res.status(404).send({message: "product With The Specified Id Does Not Exists"})
            } catch (error) {
                return res.status(500).send({message: "Internal Server Error"})
            }
        }

        static addProduct = async (req, res) => {

          try {
            const { name, categoryId, price, stoke } = req.body;
            
           let data = await uploadFile(req)
           const item = new productModel({
            name,
            categoryId,
            price,
            stoke,
            image:data
          });
        
      
            const productData = await item.save();
            return res.status(200).send({
              success: true,
              massage: "Product Added Successfully",
            });
          } catch (error) {
            res.status(400).send({ success: false, message: error.message });
          }
        };

     }