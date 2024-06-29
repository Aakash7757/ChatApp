const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const dbUrl = "mongodb://localhost:27017/ChatApp";
const app = express();
const PORT = 3000;


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};

connectDB();

const Message = mongoose.model("Message", { name: String, message: String });

app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.send(messages);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post('/messages', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
