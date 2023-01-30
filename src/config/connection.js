import { connect, set } from "mongoose";

export const connection = () => {
  const databaseUrl = process.env.DATABASE_URL;
  try {
    set("strictQuery", false);
    connect(databaseUrl);

    console.log(" db connection successfully");
  } catch (error) {
    console.log("db connection failed");
    console.log("error: >>", error);
    throw new Error(error.message);
  }
};
