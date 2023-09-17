const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomVideos } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let videoCheck = await connection.db.listCollections({ name: 'thought' }).toArray();
  if (videoCheck.length) {
    await connection.dropCollection('thought');
  }

  let userCheck = await connection.db.listCollections({ name: 'user' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('user');
  }

  const users = [];
  const thoughts = getRandomVideos(10);

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];

    users.push({
      first,
      last,
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
