# Cell Node (Elysian Release)

![GitHub contributors](https://img.shields.io/github/contributors/ixofoundation/ixo-cellnode) ![GitHub repo size](https://img.shields.io/github/repo-size/ixofoundation/ixo-cellnode) ![Lines of code](https://img.shields.io/tokei/lines/github/ixofoundation/ixo-cellnode?style=plastic) ![Docker Pulls](https://img.shields.io/docker/pulls/northroomza/ixo-cellnode) ![Twitter Follow](https://img.shields.io/twitter/follow/ixoworld?style=social)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Elysian release of Cellnode
This runs a Node.js app using [Express 4](http://expressjs.com/) in a dockerized container.

## Documentation

- [Endpoints](/documentation.md)
- [RPC](/api.md#cell-node-api)

## Run

### From Source

Requirements

- [PostgreSQL](https://www.postgresql.org/download/)
- [Memcached](https://memcached.org/downloads)

```bash
git clone https://github.com/ixofoundation/ixo-cellnode.git
cd ixo-cellnode/
```

Copy `.env.example` to `.env` and configure. If this step is skipped, ixo-cellnode will use `.env.example` as the configuration by default.

- Create a database called Cellnode

```bash
npm install
npx prisma migrate reset
npx prisma generate
npm run build
npm start
```

---

### Using Docker (with Compose)

Requirements

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

```bash
git clone https://github.com/ixofoundation/ixo-cellnode.git
cd ixo-cellnode/
```

Copy `.env.example` to `.env` and configure. If this step is skipped, ixo-cellnode will use `.env.example` as the configuration by default. Don't use quotations when assigning env vars for docker. Delete the seed folder in src/seed/\* if you do not plan to import data from json. Create a role(e.g. app_user) in the DB for postgress to work.

```bash
docker build -t ixofoundation/ixo-cellnode:latest .
docker compose up -d
```

---

###Akash
[![Akash](https://raw.githubusercontent.com/ixofoundation/ixo-cellnode/master/akash%20button.svg)](https://github.com/ixofoundation/ixo-cellnode/blob/master/akash.deploy.yaml)

---

### Seeding the Database with Previous MongoDB Data

- Export all collections as JSON from the Cellnode MongoDB database
- Place the resulting JSON files within the `src/seed/json_exports` directory
- Configure `DATABASE_URL` in `.env` with the correct username, password and host

Local PostgreSQL

- Create a database called Cellnode

```bash
npx prisma migrate reset
npx prisma generate
npx ts-node src/seed/seed.ts
```

Docker PostgreSQL

```bash
docker build .
npx prisma generate
npx ts-node src/seed/seed.ts
```

## Configuration

Handlers are registered according to the capability loaded from the [configuration file](/config.json). Template defines where the schema template directory can be found and the allow determines who has access to specified capability.

```
{
	"configuration": [
		{
			"capability": "CreateProject",
			"template": "projects",
			"allow": [
				"did:sov:*",
				"did:ixo:*"
			],
		},
		{
			"capability": "CreateAgent",
			"template": "agents"
		},
		{
			"capability": "UpdateAgentStatus",
			"template": "agents"
		},
		{
			"capability": "SubmitClaim",
			"template": "claims"
		},
		{
			"capability": "EvaluateClaim",
			"template": "evaluations"
		},
		{
			"capability": "ListClaims",
			"template": "claims"
		},
		{
			"capability": "ListAgents",
			"template": "agents"
		}
	]
}
```

## Develop notes:

### Memcached

You need memcached in order to riun the server, please install it on local machine for development. Mac users can install it through brew:

```
brew install memcached

brew services start memcached
brew services restart memcached
brew services stop memcached
```
