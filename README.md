## React + TypeScript + Serverless API with Vercel Functions

Testing serverless functions with Vercel with a React frontend. 

Serverless functions are inside the `/api` directory.

## Tips
This took me a while to find out...
If you need to import a file from outside of `api` folder, you have to specify the file extension:
* ❌ `import { SubmitRequestValidator } from "../validators/index"`
* ✅ `import { SubmitRequestValidator } from "../validators/index.js"`

## Endpoints
* GET `/api/questions`: get all the questions without the answers.
* POST `/api/check`: user send all the answers and server returns the correct answer and if it's correct.
