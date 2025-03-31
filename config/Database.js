const mongoose = require("mongoose");

module.exports = {
    connectToDB: async function (MONGODB_URI, PASSWORD) {
      await mongoose.connect(
        MONGODB_URI.replace("<db_password>", PASSWORD).replace("<database-name>", process.env.DATABASE)
      );
      console.log("Connected to MongoDB.");
    
      return {
        closeConnection: async function () {
          await mongoose.connection.close();
    
          console.log("Connection to MongoDB Closed.");
        },
      };
    }
};