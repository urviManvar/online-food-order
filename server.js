import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
dotenv.config();
import { connection } from "./src/config/connection.js";
import router from "./src/router/index.js";



connection();
const app = express();

const port = process.env.PORT;
app.use("/uploads", express.static("./uploads"));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
