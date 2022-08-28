import mongoose from "mongoose";

class Database {
  private db: string;

  constructor() {
    this.db = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD
    );
  }

  connect() {
    mongoose
      .connect(this.db, {})
      .then(() => {
        console.log("DB connection successful");
      })
      .catch((err) => console.log(err));
  }
}

export default Database;
