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

##### Parameters

| Name  | Located in | Description | Required | Schema |
| ----- | ---------- | ----------- | -------- | ------ |
| items | body       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /storage/store

#### POST

##### Description:

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

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /public/fetchpublic

#### GET

##### Description:

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |

### /api/query/queryransactions

#### GET

##### Description:

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

##### Parameters

| Name       | Located in | Description | Required | Schema |
| ---------- | ---------- | ----------- | -------- | ------ |
| projectDid | body       |             | Yes      | string |
| userDid    | body       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | OK          |
