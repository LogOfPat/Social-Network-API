const connection = require('../config/connections');
const {Reaction, Thought, User} = require('../models');

connection.on('error', (err) => err);
console.log("connected");

connection.once('open', async () => {
  console.log("Connection open")
//   Check database for existing collections then delete them.
  let thoughtCheck = await connection.db.listCollections({name: 'thoughts'}).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db.listCollections({name: 'users'}).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
  
  let newThought = {
    thoughtText: "this is a thought",
    username: "john",

  }

  const thoughtsData = await Thought.insertMany(newThought);

  let usersData = [];

  let newUser = {
    username: "john",
    email: "john@email.com",
    thoughts: [...thoughtsData.map(({_id}) => _id)]
  }

  usersData.push(newUser);
  await User.insertMany(usersData);

  console.table(usersData);
  console.info("Seeding complete"); 
  process.exit(0);
});

