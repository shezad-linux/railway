import express from 'express';
import { dbConnection } from './Database/dbConnection.js';
import bookingRoutes from './routes/bookingRoutes.js';
import infoRoutes from './routes/infoRoutes.js'
import userRouter from './routes/userRoutes.js';
import createTrain from './routes/createTrain.js'
import { config } from 'dotenv';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const app = express();
config({ path: './config/config.env' });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ['GET', 'POST', 'DELETE', 'PUT'],
    
  credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);


app.use('/api/v1/user', userRouter);
app.use('/api/v1/booking',bookingRoutes);
app.use('/api/v1/infoRoutes',infoRoutes);
app.use('/api/v1/createTrains', createTrain);

dbConnection();

app.use(errorMiddleware);
export default app;
