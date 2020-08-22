const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
  {
    client: { 
        name: String, 
        email: String 
    },
    task: { 
        fileName: String, 
        language: String,
        characters: Number
    },
    price: Number,
    date: Number,
    deadline: Number,
    done: Boolean
  }, { versionKey: false }
)

module.exports = mongoose.model('order', Order)
