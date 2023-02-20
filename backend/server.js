import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import errorHandler from './middleware/errorMiddleware.js';
import dbConnect from './config/db.js';
import pkg from 'colors';
import ticketRouter from './routes/ticketRoute.js';

const { colors } = pkg;

dotenv.config();
dbConnect();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', userRouter);
app.use('/api', ticketRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started on port : ${PORT}`);
});
