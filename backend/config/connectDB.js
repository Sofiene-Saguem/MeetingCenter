const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("the DB is connected");
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectDB;
