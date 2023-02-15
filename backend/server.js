import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/api', userRouter);

app.listen(PORT, () => {
  console.log(`server started on port : ${PORT}`);
});
