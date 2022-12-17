# IXO CellNode 

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

![Twitter Follow](https://img.shields.io/twitter/follow/ixoworld?style=social)
![Medium](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)

Instructions to set up the Elysian release of the Cell Node.  
This runs a Node.js app using [Express 4](http://expressjs.com/) in a dockerized container.

---


## Akash
Run this on Akash!
[![Akash](https://raw.githubusercontent.com/ixofoundation/ixo-cellnode/master/akash%20button.svg)](https://github.com/ixofoundation/ixo-cellnode/blob/master/akash.deploy.yaml) 

---

## Running Cellnode

Make sure you have [Docker](https://docker.com/) installed.

```sh
git clone https://github.com/ixofoundation/ixo-cellnode.git # or clone your own fork
cd ixo-cellnode/
npm install
cd bin
./start.sh

***********************************
* ELYSIAN START                   *
***********************************

Creating db ... done
Creating cache ... done
Creating mq    ... done
Creating pol   ... done
Creating cli   ... done
Creating app   ... done
Starting db ... done
Starting mq ... done
Starting cache ... done
Starting pol ... done
Starting app ... done
Starting Elysian ...done
Attaching to app
app      | register handler.createProject
app      | register handler.createAgent
app      | register handler.updateAgentStatus
app      | register handler.submitClaim
app      | register handler.evaluateClaim
app      | register handler.listClaims
app      | register handler.listAgents
app      | (node:17) [DEP0010] DeprecationWarning: crypto.createCredentials is deprecated. Use tls.createSecureContext instead.
app      | (node:17) [DEP0011] DeprecationWarning: crypto.Credentials is deprecated. Use tls.SecureContext instead.
app      | Memcache connected
app      | MongoDB connected
app      | App listening on port 5000
app      | RabbitMQ connected

***********************************
* ELYSIAN START COMPLETE          *
***********************************

```

Handlers are registered according to the capability loaded from the configuration file from the /bin folder. Template defines where the schema template directory can be found and the allow determines who has access to specified capability.

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

```
./stop.sh

***********************************
* ELYSIAN SHUTDOWN                *
***********************************

Stopping app   ... done
Stopping pol   ... done
Stopping mq    ... done
Stopping cache ... done
Stopping db    ... done
Going to remove app, cli, pol, mq, cache, db
Are you sure? [yN] y
Removing app   ... done
Removing cli   ... done
Removing pol   ... done
Removing mq    ... done
Removing cache ... done
Removing db    ... done

***********************************
* ELYSIAN SHUTDOWN COMPLETE       *
***********************************


```

To secure the Mongo DB:
```
docker exec -ti db /bin/bash
mongod
use admin
db.createUser({user: "<admin username>", pwd: "<admin password>", roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})

use admin
db.auth("<admin username>", "<admin password>" )

mongo --port 27017 -u "<admin username>" -p "<admin password>" --authenticationDatabase "admin"

use elysian
db.createUser({user: "<username>", pwd: "<password>", roles: [{role: "readWrite", db: "elysian"}]})
```

## Documentation

API documentation can be found [here](api.md).

## License

 - **MIT** : http://opensource.org/licenses/MIT


