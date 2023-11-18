import express  from "express";
import { PORT } from "./config.js";

const app = express();

app.get('/', (request, response) => {
  console.log(request)
  return response.status(234).send('welcome to my ecommerce')
})

app.listen(PORT, () => {
  console.log(`your are now connected on port ${PORT}`)
})
