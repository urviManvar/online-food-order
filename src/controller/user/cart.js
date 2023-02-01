import { cartModel } from "../../model/user/cart.js";
import { userModel } from "../../model/user/loginModel.js";
import productModel from "../../model/admin/productModel.js";
import mongoose from "mongoose";

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
}
