require("dotenv").config();
import * as http from "http";
import cache from "./Cache";
import App from "./App";

const BLOCKSYNC_URI_REST = process.env.BLOCKSYNC_URI_REST || "";
console.log("Connecting to blocksync on: " + BLOCKSYNC_URI_REST);

const port = normalizePort(process.env.PORT || "");
App.set("port", port);
const server = http.createServer(App);

cache.connect();

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

process.on("SIGTERM", function () {
    console.log("Shut down");
    cache.close();
    process.exit(0);
});

function normalizePort(val: number | string): number | string | boolean {
    let port: number = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") throw error;
    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.log(`${bind} requires elevated privileges`);
            process.exit(1);
        case "EADDRINUSE":
            console.log(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
}

function onListening(): void {
    let addr = server.address();
    let bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`App listening on ${bind}`);
}
