import mongoose from "mongoose";

// Schema
const Schema = mongoose.Schema

const cardSchema = new Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},
  graded: {type: String, enum: ['Graded', 'Raw'], required: true},
  category: {type: String, required: true}
},
 {
  timestamps: true
});

// model

export const Card = mongoose.model("Card", cardSchema)
