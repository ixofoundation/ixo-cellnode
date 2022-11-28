import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "Cellnode",
    },
    host: "",
    basePath: "",
    paths: {
        "/graphiql": {
            get: {
                description: "GraphiQL IDE",
                parameters: [],
                responses: {
                    "200": {
                        description: "OK",
                    },
                },
            },
        },
        "/graphql": {
            post: {
                description: "GraphQL",
                parameters: [],
                responses: {
                    "200": {
                        description: "OK",
                    },
                },
            },
        },
    },
};

const outputFile = "swagger.json";
const endpointsFiles = [
    "src/routes/AbstractRouter.ts",
    "src/routes/PublicRouter.ts",
    "src/routes/QueryRouter.ts",
    "src/routes/RequestRouter.ts",
];

swaggerAutogen()(outputFile, endpointsFiles, doc);
