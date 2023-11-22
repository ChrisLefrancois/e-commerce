import express, { request }  from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Card } from "./models/cardModels.js";

const app = express();



app.use(express.json());

app.get('/', (request, response) => {
  console.log(request)
  return response.status(234).send('welcome to my ecommerce')
})

// Route for save a new card
app.post('/cards', async (request, response) => {
  try {
    console.log(request.body)
    if (
      !request.body.title ||
      !request.body.price ||
      !request.body.graded ||
      !request.body.category
    ) {
      console.log(request.body)
        return response.status(400).send({
          message: 'send all required fields'
        });
    }
    const newCard = {
      title: request.body.title,
      price: request.body.price,
      graded: request.body.graded,
      category: request.body.category
    };

    const card = await Card.create(newCard)

    return response.status(201).send(card)
  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message});
  }
}
)

// GET all book from db
app.get("/cards", async (request, response) => {
  try {
    const cards = await Card.find({});

    return response.status(200).json(cards);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
})


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('app connected to database');
    app.listen(PORT, () => {
      console.log(`your are now connected on port ${PORT}`);
    })
  })
  .catch((error) => {
    console.log(error)
  });
