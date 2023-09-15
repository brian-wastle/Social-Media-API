const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [true, 'Entry required for reactions!'],
      maxlength: 280,
    },
    username: {
      type: String,
      required: [true, 'Username required for reactions!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.toISOString().split("T") [0];
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);

module.exports = reactionSchema;
