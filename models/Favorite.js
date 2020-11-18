const mongoose = require ('mongoose');
const { Schema, model } = mongoose;

const favoriteSchema = new Schema (
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    id: String,
    name: String,
    address: String,
    rating: String,
    lat: Number,
    lng: Number
  }, {
    timestamps: true
  }
)

module.exports = model('Favorite', favoriteSchema)