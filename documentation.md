# Cellnode

## Version: 1.0.0

### /

#### GET

##### Description:

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |

### /graphql

#### POST

##### Description:

GraphQL

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /api/request

#### POST

##### Description:

RPC endpoint, refer to [api.md](/api.md)

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /claims/duplicate

#### POST

##### Description:

Check if a claim with the same items column already exists

##### Parameters

| Name  | Located in | Description | Required | Schema |
| ----- | ---------- | ----------- | -------- | ------ |
| items | body       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /claims/batch

#### POST

##### Description:

Submit a batch of claims

##### Parameters

| Name   | Located in | Description | Required | Schema |
| ------ | ---------- | ----------- | -------- | ------ |
| claims | body       |             | Yes      | [ {} ] |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /storage/store

#### POST

##### Description:

Upload a file to web3.storage

##### Parameters

| Name        | Located in | Description | Required | Schema |
| ----------- | ---------- | ----------- | -------- | ------ |
| name        | body       |             | Yes      | string |
| contentType | body       |             | Yes      | string |
| data        | body       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /storage/retrieve/:cid

#### GET

##### Description:

Get the IPFS link for a web3.storage file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| cid  | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /public/:key

#### GET

##### Description:

Get an uploaded file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| key  | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /public/createpublic

#### POST

##### Description:

Upload a file

##### Parameters

| Name        | Located in | Description | Required | Schema |
| ----------- | ---------- | ----------- | -------- | ------ |
| contentType | body       |             | Yes      | string |
| data        | body       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /public/fetchpublic

#### GET

##### Description:

Get an uploaded file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| key  | body       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /api/query/queryransactions

#### GET

##### Description:

Get all transactions

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /api/query/querycapabilities

#### GET

##### Description:

Get all capabilities

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /api/capabilities

#### POST

##### Description:

Get capabilities by project and user DID

##### Parameters

| Name       | Located in | Description | Required | Schema |
| ---------- | ---------- | ----------- | -------- | ------ |
| projectDid | body       |             | Yes      | string |
| userDid    | body       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |
