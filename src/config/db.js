const mongoose = require("mongoose");

const url =
  "mongodb+srv://tharukabandara95:Dragon102824@cluster0.fybweur.mongodb.net/assessment";

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    try {
      mongoose.connect(url, {
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
      console.log(`Database connected: ${url}`);
    });

    dbConnection.on("error", (err) => {
      console.error(`connection error: ${err}`);
    });
  }
}

module.exports = new Database();
