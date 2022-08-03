## 🚀 Getting Started
### Requirement

- Install `mongodb` and launch it
- Install `nodejs`


### Launch project

First, to launch the project locally create `.env` file:

```bash
cp .env.example .env # to clone .env.example on .env

# edit .env file with your environment var
```

Finaly run the development server:

```bash
npm run dev
# or
yarn dev
```

## 🪄 Create a new service CRUD

To generate a new service you can execute : `npm run bash:generate-service`

## 🛠 Example

An example of service exists in project :
- `src/services/examples`:
  - controllers -> send response to client (no logic in the controller function)
  - middlewares -> process client request
  - models -> create mongoose models
  - routes -> create routes for services and call middlewares + controllers
  - types -> only type in services scope
  - validators -> validators of request

## 🎉 Use boilerplate
```shell
npx @dotmind/create-dotmind-app MY_PROJECT_NAME --example with-mongoose
```
