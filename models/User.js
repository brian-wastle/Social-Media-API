const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, 
      required: [true, 'Username required!'],
      trim: true
    },
    email: {
      type: String,
      unique: true, 
      required: [true, 'Email is required!'],
      trim: true,
      validate: {
        validator: function(emailInput) {
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(emailInput);
        },
        message: input => `${input.value} is not a valid email!`
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ]
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
