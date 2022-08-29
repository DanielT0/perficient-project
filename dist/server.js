"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Server {
    constructor(app) {
        this.app = app;
        this.port = process.env.PORT || "3000";
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App running on port ${this.port}`);
        });
    }
}
exports.default = Server;
