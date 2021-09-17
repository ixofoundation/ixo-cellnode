# Cellnode API Documentation

This document lists Cellnode's API endpoints and provides some examples of their usage. Since ixo-apimodule is another ixo component which interacts extensively with Cellnode and demonstrates its usage in `demo.ts`, some documentation for ixo-apimodule is also provided here to illustrate their interactions.

* [ixo-apimodule](#ixo-apimodule) \(NPM module\)
* [ixo-cellnode](#cell-node-api) \(decentralised data store\)

## ixo-apimodule 

(For the code and further documentation, refer to the repo [here](https://github.com/ixofoundation/ixo-apimodule).)

This NPM module provides APIs that simplify interactions between the ixo-SDK user interfaces and Cell Nodes, Blockchain Nodes and blocksync.

`npm install --save ixo-module`

To Create a new ixo Object \(Without provider\)

```text
import ixo from 'ixo-module';
var ixo = new ixo('ixo_node_url')
```

NOTE

### Entity Functions

Functions are called using `ixo.project.<functionName>`. In future, this will be replaced with the more generic `ixo.entity.<functionName>`.

#### List Entities

Returns a list of all entities cached in the Explorer Node \(ixo-blocksync\). Note that each ixo Relayer Portal can configure their instance of ixo-blocksync to only synchronise entities that are associated with the Relayer. Linked entities have the Relayer Node-ID in their blockchain record \(Entity Document\).

Request:

```text
ixo.project.listProjects().then((result) => {
    console.log('Project List: ' + result)
})
```

Response: [ixo Explorer: listProjects](https://app.swaggerhub.com/apis-docs/drshaun/ixo/0.2.3#/projects/listProjects) 

#### Get Project

Retrieves public project details by DID

```text
let projectDid = 'did:ixo:TknEju4pjyRQvVehivZ82x';
ixo.project.getProjectByProjectDid(projectDid).then((result) => {
    console.log('Project Details: ' + result)
})
```

Response: [ixo Explorer: getProject](https://app.swaggerhub.com/apis-docs/drshaun/ixo/0.2.3#/projects/getByProjectDid)

#### Create Project

```text
ixo.project.createProject(projectData, signature, CellnodeUrl).then((result) => {
    console.log('Project Details: ' + result)
})
```

Response: [ixo Cellnode: createProject](#create-entity)

#### Update Project Status
Updates a project's current status.

Valid project status updates are:
```text
- Null    -> CREATED
- CREATED -> PENDING
- PENDING -> CREATED or FUNDED
- FUNDED  -> STARTED
- STARTED -> STOPPED
- STOPPED -> PAIDOUT
```

```text
ixo.project.updateProjectStatus(projectStatusData, signature, CellnodeUrl).then((result) => {
    console.log('Project Update Details: ' + result)
})          
```

Response: [ixo Cellnode: updateProjectStatus](#update-project-status-1) 

#### Update Project Doc
Updates a project's `Data` field.

```text
ixo.project.updateProjectDoc(projectDocData, signature, CellnodeUrl).then((result) => {
    console.log('Project Update Details: ' + result)
})    
```

Response: [ixo Cellnode: updateProjectDoc](#update-project-doc-1)

#### Withdraw Funds
Withdraws a project agent's funds from the project.

```text
ixo.project.withdrawFunds(withdrawFundsData, signature, responseFee).then((result) => {
    console.log('Withdraw Funds Details: ' + result)
})    
```

Response: [ixo Explorer: withdraw funds](https://app.swaggerhub.com/apis-docs/drshaun/ixo/0.2.3#/transactions/sendTransaction)

#### Upload Public Data

Function to upload into a Cell Node any public content relating to an entity. This returns a unique content identifier \(CID\) for the data. This allows the data to be content-addressed and retrieved using the identifier `dataUrl`. The primary use is to upload images and json template files to the Cell Node. But this can accept any arbitrary project-specific public data.

The `dataUrl` takes the form of `data:<mediatype>;<encoding>,<data>` // In future this will be replaced by IPLD standard content addresses

```text
// Upload an image
let dataUrl = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO 9TXL0Y4OHwAAAABJRU5ErkJggg==';
ixo.project.createPublic(dataUrl, CellnodeUrl) {
    console.log('Document hash: ' + result)
})
```

Response: [ixo Cellnode: createPublic](#upload-an-image)

#### Retrieve Public Data

Retrieves previously uploaded data from a Cell-Node using the content address \(hash\)

```text
ixo.project.fetchPublic(documentHash, CellnodeUrl) {
    console.log('Document hash: ' + result)
})
```

Response: [ixo Cellnode: fetchPublic](#fetch-image)

### Agent Functions

These calls take the form `ixo.agent.<functionName>`

#### List Agents

Returns a list of all agents associated with an entity, from the Cell Node.

Request:

```text
ixo.agent.listAgentsForProject(data, signature, CellnodeUrl).then((result) => {
    console.log('Agent List: ' + result)
})
```

Response: [ixo Cellnode: listAgents](#list-agents-1)

#### Register an Agent for an Entity

Associates the Agent DID with the entity.

Request:

```text
ixo.agent.createAgent(agentData, signature, CellnodeUrl).then((result) => {
    console.log('Create Agent: ' + result)
})
```

Response: [ixo Cellnode: createAgent](#create-agent)

#### Update Agent Status

Update an agent's registration status.

Valid statuses are:

| Status | Value |
| :--- | :--- |
| Pending | 0 |
| Approved | 1 |
| Revoked | 2 |

Request:

```text
ixo.agent.updateAgentStatus(agentData, signature, CellnodeUrl).then((result) => {
    console.log('Update Agent Status: ' + result)
})
```

Response: [ixo Cellnode: updateAgentStatus](#update-agent-status-1)

### Claim Functions

Calls take the form `ixo.claim.<functionName>`

#### List Claims

Returns a list of all claims for an entity, from a Cell Node, together with the claim status.

Request:

```text
ixo.claim.listClaimsForProject(data, signature, CellnodeUrl).then((result) => {
    console.log('Claim List: ' + result)
})
```

Response: [ixo Cellnode: listClaimsForProject](#list-claims-1)

#### List Claims by Template ID

Returns a list of filtered claims for an entity, from a Cell Node, together with the claim status. Claims are filtered by a template ID expected to be included in `data` as `claimTemplateId`.

Request:

```text
ixo.claim.listClaimsForProjectByTemplateId(data, signature, CellnodeUrl).then((result) => {
    console.log('Claim List: ' + result)
})
```

Response: [ixo Cellnode: listClaimsForProjectByTemplateId](#list-claims-by-template-id-1)

#### Issue Claim

Issues a claim for an entity.

Request:

```text
ixo.agent.createClaim(agentData, signature, CellnodeUrl).then((result) => {
    console.log('Create Claim: ' + result)
})
```

Response: [ixo Cellnode: createClaim](#submit-claim)

#### Evaluate a Claim

Sets the evaluation status for a claim.

Valid statuses are:

| Status | Value |
| :--- | :--- |
| Pending | 0 |
| Approved | 1 |
| Rejected | 2 |

Request:

```text
ixo.agent.evaluateClaim(evaluationData, signature, CellnodeUrl).then((result) => {
    console.log('Create Evaluation: ' + result)
})
```

Response: [ixo Cellnode: evaluateClaim](#evaluate-claim)

### User Functions

#### Register agent DID and DID Document

Registers a new agent identifier and DID document \(DDO\) to the ixo blockchain.

Request:

```text
ixo.user.registerUserDid(didData, signature, responseFee).then((result) => {
    console.log('Register DID: ' + result)
})
```

Response: [ixo Blockchain: registerUserDid](TODO)

#### Get a DID Document

Retrieves the DID Doc for a specified agent identifier

Request:

```text
Let did = 'did:sov:2p19P17cr6XavfMJ8htYSS';
ixo.user.getDidDoc(did).then((result) => {
    console.log('DID Doc: ' + result)
})
```

Response: [ixo Blockchain: getDidDoc](https://github.com/ixofoundation/ixo-blockchain/blob/a5d632c3e86250f56300f0a623fd50702b2fd36c/client/docs/swagger-ui/swagger.yaml#L2016)

### Metrics

Returns the global statistics for all entities associated with a Relayer node.

Request:

```text
ixo.stats.getGlobalStats().then((result) => {
    console.log('Statistics: ' + result)
})
```

Response: [ixo Explorer: listStats](https://app.swaggerhub.com/apis-docs/drshaun/ixo/0.2.3#/stats/getStats)

### Health Check Functions

#### Explorer node health check

Request:

```text
ixo.network.pingIxoExplorer().then((result) => {
    console.log('Health Check: ' + result)
})
```

Response: [ixo Explorer: ping](https://app.swaggerhub.com/apis-docs/drshaun/ixo/0.2.3#/blocksync/ping)

## Cell Node API

Note: the legacy name for Cell Node was Project Data Store \(PDS\).

A Cell Node is a decentralised data processing and storage node. This has a public API and private API. Public API requests do not require cryptographic signatures. All other requests must be signed and adhere to the capabilities that have been granted to the signer.

### Public API

URI: `<cellnode server>/api/public`

Request type: `POST`

Structure: `{"jsonrpc": "2.0", "method": "<method name>", "id": <message id>, "params": <json data object> }`

| Variable | Description |
| :--- | :--- |
| `<node server>` | The URL of the server |
| `<entity>` | The entity to send the method |
| `<method name>` | The name of the method to call defined in the config file |
| `<message id>` | The message ID, used to correlate asynchronous responses |
| `<json data object>` | The parameters that are passed to the method handler |

#### Structure of the params object

These are unsigned requests for publicly available information. A content identifier is generated and sent back to the client, to be used in retrieval of this information.

Data will be accepted any of the following encodings: "ascii" \| "utf8" \| "utf16le" \| "ucs2" \| "base64" \| "latin1" \| "binary" \| "hex".

contentType should reference a MIME type. See [https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics\_of\_HTTP/MIME\_types/Complete\_list\_of\_MIME\_types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)

```text
{
    "jsonrpc":"2.0", 
    "method":"createPublic",
    "id": 123,
    "params": {
        "data": "bob public message", 
        "contentType": "text"
        }
}
```

`<a name="cellnode-createPublic-image"></a>`

#### Upload an image

Request:

```text
{
    "jsonrpc": "2.0", 
    "method": "createPublic", 
    "id": 3, 
    "params": 
        {
        "data": "<base64 encoded image>", 
        "contentType": "image/png"
        }
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": "<string>"
}
```

#### Fetch image

Request:

```text
{
    "jsonrpc": "2.0", 
     "method": "fetchPublic", 
     "id": 3, 
     "params": {"key": <string>}
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "data": "<base64 encoded image>",
        "contentType": "image/png"
    }
}
```

#### Upload a Json file

Request:

```text
{
     "jsonrpc": "2.0", 
     "method": "createPublic", 
     "id": 3, 
     "params": 
    {
       "data": "<JSON string>", 
       "contentType": "application/json"
    }
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": "<string>"
}
```

#### Fetch Json file

Request:

```text
{
    "jsonrpc": "2.0", 
     "method": "fetchPublic", 
     "id": 3, 
     "params": {"key": <string>}
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "data": "<JSON string>",
        "contentType": "application/json"
    }
}
```

### Private API

URI: `<cellnode server>/api/request`

Request type: `POST`

Structure: `{"jsonrpc": "2.0", "method": "<method name>", "id": <message id>, "params": <json data object> }`

| Variable | Description |
| :--- | :--- |
| `<node server>` | The URL of the server |
| `<entity>` | The entity to send the method |
| `<method name>` | The name of the method to call defined in the config file |
| `<message id>` | The message ID, used to correlate asynchronous responses |
| `<json data object>` | The parameters that are passed to the method handler |

#### Structure of the params object

Everything in the payload section is signed to generate a valid signature. This should be packaged using `JSON.stringify()` method before signing.

```text
{
    "jsonrpc":"2.0", 
    "method":"createAgent",
    "id": 123,
    "params": {
        "payload": {
            "template": {
                "name": "create_agent"
            },
            "data": {"projectDid": "did:ixo:TknEju4pjyRQvVehivZ82x",
                     "name": "Brennon",
                     "surname": "Hampton",
                     "email": "brennon@me.com",
                     "agentDid": "did:sov:64",
                     "role": "SA"}
        },
        "signature": {
            "type": "ed25519-sha-256",
            "created": "2018-06-27T16:02:20Z", 
            "creator": "did:ixo:2p19P17cr6XavfMJ8htYSS",
            "signatureValue": "A011D11A2D91A9CB03ECFFB7D9AFC1001DB56B3DABF42BDD0F4D00352A9B8E0E73E85F0B4586DA2934696C0A78602EEB047EA6B3D9096C1A0C3FB144E6A51C09"
        }
    }
}
```

#### Create Entity

Creates a new entity.

Request:

```text
{
    "jsonrpc": "2.0", 
    "method": "createProject", 
    "id": 3, 
    "params": {
        "payload": {        
            "template": {
                "name": "<template to validate>"
            },
            "data": {
                <create project data>
            }
        },
        "signature": {
            "type": <signature type ECDSA or E25519>,
            "created": <date of signature>, 
            "creator": <user did>,
            "signatureValue":  <signature in hex>
        }
    }
}
```

Example:

```text
{
    "jsonrpc": "2.0",
    "method": "createProject",
    "id": 123,
    "params": {
        "payload": {
            "template": {
                "name": "create_project"
            },
            "data": {
                "title": "Water project",
                "ownerName": "Don",
                "ownerEmail": "don@gmail.com",
                "shortDescription": "Project for water",
                "longDescription": "project to save water for areas with drought",
                "impactAction": "litres of water saved",
                "projectLocation": "ZA",
                "sdgs": [
                  "12.2",
                  "3",
                  "2.4"
                ],
                "requiredClaims": 30,
                "templates": {
                  "claim": {
                    "schema": "af175axcn6ejiuds0sh",
                    "form": "1v6v8a6woabjiuds3i9"
                  }
                },
                "evaluatorPayPerClaim": "0",
                "socialMedia": {
                  "facebookLink": "https://www.facebook.com/ixofoundation/",
                  "instagramLink": "",
                  "twitterLink": "",
                  "webLink": "https://ixo.foundation"
                },
                "serviceEndpoint": "http://35.192.187.110:5000/",
                "imageLink": "pc16l7yk62ejiudrox5",
                "founder": {
                  "name": "Nic",
                  "email": "nic@test.co.za",
                  "countryOfOrigin": "ZA",
                  "shortDescription": "primary description for founder",
                  "websiteURL": "www.water.com",
                  "logoLink": ""
                }
            }
        },
         "signature": {
            "type": "ed25519-sha-256",
            "created": "2018-06-05T12:35:02Z", 
            "creator": "did:ixo:2p19P17cr6XavfMJ8htYSS",
            "signatureValue": "23EED2462B11B94C9F63A509B39F15CB9C0B2DB8C16A52A22115B755BF3F6BDF7ABB8881697AA7DB6F4AFBD7C5DE4618B403AB43B738841BB89E72C8792AC401"
        }
    }
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "__v": 0,
        <project data>
        "tx": "b51cd2665d146d0a0240fd2756beb4c9e9c1948275ac5d37a7ae405ab2d71a7a",
        "_id": "5a66e09b38f45f01d90d122a",
    }
}
```

Example:

```text
{
    "jsonrpc": "2.0",
    "id": 123,
    "result": {
        "_id": "5b32094f05aa3f0011405957",
        "title": "Test Water project",
        "ownerName": "Don",
        "ownerEmail": "don@gmail.com",
        "shortDescription": "Project for water",
        "longDescription": "project to save water for areas with drought",
        "impactAction": "litres of water saved",
        "projectLocation": "ZA",
        "sdgs": [
            "12.2",
            "3",
            "2.4"
        ],
        "requiredClaims": 30,
        "templates": {
            "claim": {
                "schema": "af175axcn6ejiuds0sh",
                "form": "1v6v8a6woabjiuds3i9"
            }
        },
        "evaluatorPayPerClaim": "0",
        "socialMedia": {
            "facebookLink": "https://www.facebook.com/ixofoundation/",
            "instagramLink": "",
            "twitterLink": "",
            "webLink": "https://ixo.foundation"
        },
        "serviceEndpoint": "http://35.192.187.110:5000/",
        "imageLink": "pc16l7yk62ejiudrox5",
        "founder": {
            "name": "Nic",
            "email": "nic@test.co.za",
            "countryOfOrigin": "ZA",
            "shortDescription": "primary description for founder",
            "websiteURL": "www.water.com",
            "logoLink": ""
        },
        "txHash": "a09c8bc12a3e7cc1f859f0fc98cd37880d8c894826e0f1fa7a3f824db37941f5",
        "__v": 0
    }
}
```

#### Create Agent

Creates a new agent.

Request:

```text
{
    "jsonrpc": "2.0", 
    "method": "createAgent", 
    "id": 3, 
    "params": {
        "payload": {        
            "template": {
                "name": "<template to validate>"
            },
            "data": {
                <create agent data>
            }
        },
        "signature": {
            "type": <signature type ECDSA or E25519>,
            "created": <date of signature>, 
            "creator": <user did>,
            "signatureValue":  <signature in hex>
        }
    }
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "__v": 0,
        <agent data>
        "tx": "b51cd2665d146d0a0240fd2756beb4c9e9c1948275ac5d37a7ae405ab2d71a7a",
        "_id": "5a66e09b38f45f01d90d122a",
        "version": 1
    }
}
```

#### Update Agent Status

Updates an agent's status.

Request:

```text
{
    "jsonrpc": "2.0", 
    "method": "updateAgentStatus", 
    "id": 3, 
    "params": {
        "payload": {        
            "template": {
                "name": "<template to validate>"
            },
            "data": {
                <update agent data>
            }
        },
        "signature": {
            "type": <signature type ECDSA or E25519>,
            "created": <date of signature>, 
            "creator": <user did>,
            "signatureValue":  <signature in hex>
        }
    }
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "__v": 0,
        <agent data>
        "tx": "b51cd2665d146d0a0240fd2756beb4c9e9c1948275ac5d37a7ae405ab2d71a7a",
        "did": <creator's did>
        "_id": "5a66e09b38f45f01d90d122a",
        "version": 1
    }
}
```

#### List Agents

List claims and latest status.

Request:

```text
{
    "jsonrpc": "2.0", 
    "method": "listAgents", 
    "id": 3, 
    "params": {
        "payload": {        
            "template": {
                "name": "<template to validate>"
            },
            "data": {
                <data to filter>
            }
        },
        "signature": {
            "type": <signature type ECDSA or E25519>,
            "created": <date of signature>, 
            "creator": <user did>,
            "signatureValue":  <signature in hex>
        }
    }
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": [
        {
            <agent data>,
            "currentStatus": {
                <agent status data>
            }
        }
    ]
}
```

#### Submit Claim

Creates a new claim.

Request:

```text
{
    "jsonrpc": "2.0", 
    "method": "submitClaim", 
    "id": 3, 
    "params": {
        "payload": {        
            "template": {
                "name": "<template to validate>"
            },
            "data": {
                <submit claim data>
            }
        },
        "signature": {
            "type": <signature type ECDSA or E25519>,
            "created": <date of signature>, 
            "creator": <user did>,
            "signatureValue":  <signature in hex>
        }
    }
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "__v": 0,
        <claim data>
        "tx": "b51cd2665d146d0a0240fd2756beb4c9e9c1948275ac5d37a7ae405ab2d71a7a",
        "_id": "5a66e09b38f45f01d90d122a"
    }
}
```

#### Evaluate Claim

Evaluate a claim.

Request:

```text
{
    "jsonrpc": "2.0", 
    "method": "evaluateClaim", 
    "id": 3, 
    "params": {
        "payload": {        
            "template": {
                "name": "<template to validate>"
            },
            "data": {
                <evaluate claim data>
            }
        },
        "signature": {
            "type": <signature type ECDSA or E25519>,
            "created": <date of signature>, 
            "creator": <user did>,
            "signatureValue":  <signature in hex>
        }
    }
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "__v": 0,
        <claim data>
        "tx": "b51cd2665d146d0a0240fd2756beb4c9e9c1948275ac5d37a7ae405ab2d71a7a",
        "_id": "5a66e09b38f45f01d90d122a",
        "version": 1
    }
}
```

#### List Claims

List claims and latest status.

Request:

```text
{
    "jsonrpc": "2.0", 
    "method": "listClaims", 
    "id": 3, 
    "params": {
        "payload": {        
            "template": {
                "name": "<template to validate>"
            },
            "data": {
                <data to filter>
            }
        },
        "signature": {
            "type": <signature type ECDSA or E25519>,
            "created": <date of signature>, 
            "creator": <user did>,
            "signatureValue":  <signature in hex>
        }
    }
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": [
        {
            <claim data>,
            "evaluations": {
                <claim status data>
            }
        }
    ]
}
```

#### List Claims by Template ID

List claims and latest status filtered by template ID. The template ID is expected to be included in `<data to filter>` as `claimTemplateId`.

Request:

```text
{
    "jsonrpc": "2.0", 
    "method": "listClaims", 
    "id": 3, 
    "params": {
        "payload": {        
            "template": {
                "name": "<template to validate>"
            },
            "data": {
                <data to filter>
            }
        },
        "signature": {
            "type": <signature type ECDSA or E25519>,
            "created": <date of signature>, 
            "creator": <user did>,
            "signatureValue":  <signature in hex>
        }
    }
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": [
        {
            <claim data>,
            "evaluations": {
                <claim status data>
            }
        }
    ]
}
```

#### Update Project Status

Updates a project's current status.

Request:

```text
{
    "jsonrpc": "2.0", 
    "method": "updateProjectStatus", 
    "id": 3, 
    "params": {
        "payload": {        
            "template": {
                "name": "<template to validate>"
            },
            "data": {
                <project status data>
            }
        },
        "signature": {
            "type": <signature type ECDSA or E25519>,
            "created": <date of signature>, 
            "creator": <user did>,
            "signatureValue":  <signature in hex>
        }
    }
}
```

Response:

```text
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": [
        {
            TODO
        }
    ]
}
```

#### Update Project Doc
Updates a project's `Data` field.

Request:

```text
{
    "jsonrpc": "2.0", 
    "method": "updateProjectDoc", 
    "id": 3, 
    "params": {
        "payload": {        
            "template": {
                "name": "<template to validate>"
            },
            "data": {
                <project doc data>
            }
        },
        "signature": {
            "type": <signature type ECDSA or E25519>,
            "created": <date of signature>, 
            "creator": <user did>,
            "signatureValue":  <signature in hex>
        }
    }
}
```

Response:

TODO

#### Fund Project

Funds a project.

Request:

```text
{
    "jsonrpc": "2.0", 
    "method": "fundProject", 
    "id": 3, 
    "params": {
        "payload": {        
            "template": {
                "name": "<template to validate>"
            },
            "data": {
                <fund project data>
            }
        },
        "signature": {
            "type": <signature type ECDSA or E25519>,
            "created": <date of signature>, 
            "creator": <user did>,
            "signatureValue":  <signature in hex>
        }
    }
}
```

Response:

TODO

### Health Check Functions

#### Cell Node Health Check

URI: `<cellnode server>/`

Request type: `GET`

Response:

```text
API is running
```

The ixo-cellNode \(cellnode\) uses JSON-RPC to receive client requests. The structure of all calls follow the same structure:
