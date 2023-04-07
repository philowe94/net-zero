const mongoose = require('mongoose');
const keys = require("./keys");

const dbURI = keys.mongoURI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
  console.log('Connected to Atlas Cloud database.');

  function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  // Define the data to seed
  const usersdata = [
    {
      handle: "demo",
      email: "demo@demo.com",
      password: encryptPassword("password123"),
      pledges: [],
    },
  ];

  const pledgedata = [
    {
      title: "Demo Pledge",
      description: "This is a demo pledge.",
      actionlist: ["Do this", "Do that"],
      public: true,
      comments: [
        {
          authorId: {"$oid":"643093bfb33a981f1c777534"},
          authorName: "Demo",
          text: "This is a demo comment.",
          date: Date.now(),
        },
      ],
      user: {"$oid":"643093bfb33a981f1c777534"},
      image: "",
    },
    {
      title: "Demo Pledge 2",
      description: "This is a demo pledge.",
      actionlist: ["Do this", "Do that"],
      public: true,
      comments: [
        {
          authorId: {"$oid":"643093bfb33a981f1c777534"},
          authorName: "Demo",
          text: "This is a demo comment.",
          date: Date.now(),
        },
      ],
    }
  ]

  // Insert the data into the database
  db.collection('users').insertMany(usersdata, (err, result) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Inserted ${result.insertedCount} documents into the users collection.`);
    process.exit(0);
  });
});