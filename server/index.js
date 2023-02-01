import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/rthandle.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 3000;

const connectDB = () => {
  mongoose.set({
    strictQuery: false,
  });
  return mongoose.connect(process.env.DBURL);
};

const app = express();
app.use(express.json());
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'views')));
app.use('/user', router);

app.get('/', (req, res) => {
  // res.sendFile(__dirname + './views/resetPass.html');
  res.send('Hello Form server');
});

app.listen(PORT, async () => {
  console.log('Connecting to Database...');
  try {
    await connectDB();
    console.log('connected to Database');
    console.log(`Server is Listening at ${PORT} ...`);
  } catch (err) {
    console.log('Error While Connecting to DB', err);
  }
});
