## React + TypeScript + Serverless API with Vercel Functions

Testing serverless functions with Vercel with a React frontend. 

Serverless functions are inside the `/api` directory.

## Tips
This took me a while to find out...

1. If you need to import a file from outside of `api` folder, you have to specify the file extension:
* ❌ `import { SubmitRequestValidator } from "../validators/index"`
* ✅ `import { SubmitRequestValidator } from "../validators/index.js"`

2. This is not a template, so you may want to checkout carefully the `tsconfig.json` at root and api folders, the `vercel.json` and `package.json`.
3. `npm i vercel` and run `vercel dev` for development environment, if you require to run the api and client at the same time.

## Endpoints
* GET `/api/questions`: get all the questions without the answers.
* POST `/api/check`: user send all the answers and server returns the correct answer and if it's correct.
