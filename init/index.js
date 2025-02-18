const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listinds.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then((res) => console.log("connections success."))
  .catch((err) => console.log("error while connecting."));

const initDB = async () => {
  await listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67b071dee2f3cb6c3d0b849e",
  }));
  await listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
