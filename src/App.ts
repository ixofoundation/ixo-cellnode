import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import postgraphile from "postgraphile";
import { RequestRouter } from "./routes/RequestRouter";
import { QueryRouter } from "./routes/QueryRouter";
import { PublicRouter } from "./routes/PublicRouter";
import * as PublicHandler from "./handlers/PublicHandler";
import * as StorageHandler from "./handlers/Web3StorageHandler";
import {
    checkDuplicate,
    createBatch,
    listUnprocessed,
} from "./handlers/ClaimHandler";
import { getCapabilities } from "./handlers/CapabilityHandler";
import swaggerUi from "swagger-ui-express";
const swaggerFile = require(`${__dirname}/../../swagger.json`);
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { resolvers } from "./prisma/generated";
import { buildSchemaSync } from "type-graphql";
import { graphqlHTTP } from "express-graphql";
import { prisma } from "./prisma/prisma_client";
import { capabilitiesMiddleware } from "./graphql-capabilities";

const compression = require("compression");

const DATABASE_URL = process.env.DATABASE_URL;

class App {
    public express: any;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        const schema = buildSchemaSync({ resolvers });

        this.express.use(cors());
        this.express.use(compression({ threshold: 0 }));
        this.express.use(
            bodyParser.urlencoded({ limit: "50mb", extended: true }),
        );
        this.express.use(bodyParser.json({ limit: "4mb" }));
        // this.express.use(
        //     postgraphile(DATABASE_URL, "public", {
        //         watchPg: true,
        //         graphiql: true,
        //         enhanceGraphiql: true,
        //         dynamicJson: true,
        //     }),
        // );
        this.express.use(
            "/swagger",
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile),
        );
        this.express.use(capabilitiesMiddleware);
        this.express.use(
            "/graphql",
            graphqlHTTP({
                schema: schema,
                graphiql: false,
                context: { prisma },
            }),
        );
        this.express.use(
            helmet({
                crossOriginResourcePolicy: false,
            }),
        );
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
            standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        });
        this.express.use(limiter);
    }

    private routes(): void {
        this.express.get("/", (req, res, next) => {
            res.send("API Running");
        });

        this.express.post("/public/createpublic", async (req, res) => {
            const pub = await PublicHandler.createPublic(req.body);
            res.json(pub);
        });
        this.express.get("/public/:key", PublicHandler.getPublic);

        this.express.post("/storage/store", async (req, res) => {
            const file = await StorageHandler.store(
                req.body.name,
                req.body.contentType,
                req.body.data,
            );
            res.json(file);
        });
        this.express.get("/storage/retrieve/:cid", async (req, res) => {
            const file = await StorageHandler.retrieve(req.params.cid);
            res.redirect("https://" + file?.ipfs);
        });

        this.express.use("/api/request", new RequestRouter().router);
        this.express.use("/api/query", new QueryRouter().router);
        this.express.use("/api/public", new PublicRouter().router);

        this.express.post("/api/capabilities", async (req, res) => {
            const capabilities = await getCapabilities(
                req.body.projectDid,
                req.body.userDid,
            );
            res.json(capabilities);
        });

        this.express.post("/claims/duplicate", async (req, res) => {
            const exists = await checkDuplicate(req.body.items);
            res.json({ duplicate: exists });
        });

        this.express.post("/claims/batch", async (req, res) => {
            res.json(await createBatch(req.body.claims));
        });

        this.express.get("/claims/unprocessed", async (req, res) => {
            const claims = await listUnprocessed();
            res.json(claims);
        });
    }
}

export default new App().express;
