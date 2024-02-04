## API Connection

Using OpenAPI Typescript Code Generator, to generate API Client automatically ([docs](https://github.com/ferdikoomen/openapi-typescript-codegen/wiki/Basic-usage)).

Workflow (Postman Collection - Api Client):

1. Postman Collection export -> api.postman.json
2. Copy to folder `/dev` (create folder)
3. Run `npm run p2o` (converts api.postman.json -> api.open-api.yml). Alternatively, install globally and run as CLI ([docs](https://joolfe.github.io/postman-to-openapi/#basic-conversion)).
4. Run `npm run generate-api` (api.open-api.yml -> generates api client folder with TS files). Alternatively, install globally and run as CLI ([docs](https://github.com/ferdikoomen/openapi-typescript-codegen/wiki/Basic-usage)).
5. Folder `/src/data/api-client` should appear

## Libraries

Using Redux Toolkit.
