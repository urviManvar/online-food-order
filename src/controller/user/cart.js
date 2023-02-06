import { cartModel } from "../../model/user/cart.js";
import { userModel } from "../../model/user/loginModel.js";
import productModel from "../../model/admin/productModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
export class cartController {
  static addToCart = async (req, res) => {
    try {
      let { userId, productId } = req.body;
      const user = await userModel.findOne({
        // isDeleted: false,
        _id: mongoose.Types.ObjectId(userId),
      });
      if (!user) {
        return await res.status(402).send("user not found");
      }
      console.log("user :>> ", user);

      const availableCart = await cartModel.findOne({
        // isDeleted: false,
        userId: mongoose.Types.ObjectId(userId),
        // isCheckout: false,
      });
      console.log("availableCart1 :>> ", availableCart);
      if (availableCart) {
        console.log("availableCart if in :>> ");

        const product = await productModel.findOne({
          isDeleted: false,
          _id: mongoose.Types.ObjectId(productId),
        });
        if (!product) {
          return await res.status(402).send("product not found");
        }
        console.log("product :>> ", product);

        console.log("availableCart2 :>> ", availableCart);
        availableCart.productId.push(`${productId}`);
        availableCart.amount += product.price;
        const cartData = availableCart.save();
        console.log("cartData :>> ", cartData);
        return res.status(200).send("add to cart1 successfully");
      }
      if (req.body.productId) {
        const product = await productModel.findOne({
          isDeleted: false,
          _id: mongoose.Types.ObjectId(productId),
        });
        if (!product) {
          return await res.status(402).send("product not found");
        }
        console.log("productmm :>> ", product);

        const cart = new cartModel({
          userId: userId,
          productId: [productId],
          amount: parseInt(product.price),
        });

        console.log("cart :>> ", cart);
        const cartData = await cart.save();
        console.log("cartData 11:>> ", cartData);
      }
      return res.status(200).send("add to cart 2successfully");
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  //list data

  static listCart = async (req, res) => {
    try {
      let { cartId } = req.body;
      const checkCart = await cartModel.findOne({
        isDeleted: false,
        isCheckout: false,
        _id: mongoose.Types.ObjectId(cartId),
      });
      if (!checkCart) {
        return await res.status(402).send("cart not found");
      }
      console.log("checkCart :>> ", checkCart);

      const cartData = await cartModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(cartId) } },
        {
          $addFields: {
            productId: {
              $map: {
                input: "$productId",
                as: "p",
                in: {
                  k: "$$p",
                  v: {
                    $size: {
                      $filter: {
                        input: "$productId",
                        cond: { $eq: ["$$this", "$$p"] },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ]);

      console.log("cartData :>> ", cartData);

      return res.status(200).send({ cartData });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  //updateCart
  static updateCart = async (req, res) => {
    try {
      console.log("this is update product");
      const product = await cartModel.findOne({
        isDeleted: false,
        _id: req.params.id,
      });
      if (!product) {
        return await res.status(402).send("product not found");
      }
      console.log("product :>> ", product);

      product.userId = req.body.userId;
      product.productId = req.body.productId;
      product.amount = req.body.amount;

      const productData = await product.save();
      console.log("productData :>> ", productData);

      return res.status(200).send("data updated successfully");
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  //deleteCart
  static deleteCart = async (req, res) => {
    let id = req.params.id;
    try {
      let response = await cartModel.findOneAndDelete({ _id: id });
      if (response) {
        return res.status(200).send({ message: "Delete Successfully " });
      }
      return res
        .status(404)
        .send({ message: "Delete With The Specified Id Does Not Exists" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  //deleteInCart
  static deleteInCart = async (req, res) => {
    console.log("hi :>> ");
    try {
      const findCart = await cartModel.findOne({ _id: req.params.id });
      const productId = await productModel.findOne({ _id: req.body.productId });
      console.log("productId :>> ", productId);
      console.log(" findCart:>> ", findCart);
      if (findCart.productId.includes(req.body.productId)) {
        const index = findCart.productId.indexOf(ObjectId(productId));
        console.log("index :>> ", index);
        if (index !== -1) {
          findCart.productId.splice(index, 1);
        }
      } else {
        throw new Error("product not found");
      }
      let cartUp = await cartModel.findOneAndUpdate(
        { _id: req.params.id },
        findCart
      );
      if (!cartUp) throw new Error("not found");
      res.send({ success: "true" });
      console.log("cartUp :>> ", cartUp);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
}
