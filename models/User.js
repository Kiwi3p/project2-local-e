const mongoose = require ('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema ( 
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required'],  
      unique: true 
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Password is required'], 
      unique: true
    },
    location: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      trim: true, 
      required: [true, 'Password is required'],  //Validation form DataBase
    }
  }, {
    timestamps: true // to record created at & updated at 
  }

)

module.exports = model('User', userSchema); 