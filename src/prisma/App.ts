import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import { RequestRouter } from "./routes/RequestRouter";
import { QueryRouter } from "./routes/QueryRouter";
import { PublicRouter } from "./routes/PublicRouter";
import * as PublicHandler from "./handlers/PublicHandler";
const compression = require("compression");

class App {
    public express: any;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    };

    private middleware(): void {
        this.express.use(cors());
        this.express.use(compression({ threshold: 0 }));
        this.express.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        this.express.use(bodyParser.json({ limit: "4mb" }));
    };

    private routes(): void {
        this.express.get("/", (req, res, next) => {
            const fileSystem = require("fs");
            const pdsFile = process.env.PDS_FILE || "/usr/src";
            const data = fileSystem.readFileSync(pdsFile, "utf8");
            res.send("API is running with ID " + data);
        });

        this.express.get("/public/:key", PublicHandler.getPublic);

        this.express.use("/api/request", new RequestRouter().router);
        this.express.use("/api/query", new QueryRouter().router);
        this.express.use("/api/public", new PublicRouter().router);
    };
};

export default new App().express;