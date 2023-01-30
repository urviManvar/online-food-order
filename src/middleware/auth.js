import { verify } from "jsonwebtoken";

const config = process.env;

export const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).send("A token is required for authentication");
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log("process.env.TOKEN_KEY :>> ", process.env.JWT_TOKEN_KEY);
    const accessToken = verify(token, process.env.JWT_TOKEN_KEY);
    console.log("accessToken :>> ", accessToken);
    next();
  } catch (err) {
    console.log("err :>> ", err);
    return res.status(401).send("Invalid Token");
  }
};
