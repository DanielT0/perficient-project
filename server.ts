import { Application } from "express";

class Server {
  private app: Application;
  private port: string;
  constructor(app: Application) {
    this.app = app;
    this.port = process.env.PORT || "3000";
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App running on port ${this.port}`);
    });
  }
}

export default Server;
