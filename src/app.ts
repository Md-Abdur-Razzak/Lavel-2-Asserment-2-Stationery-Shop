import cors from 'cors';
import express, { Application } from 'express';
import router from './app/Model/StationeryProductModel/StationeryProduct.router';
import orderRouter from './app/Model/Order/order.router';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);
app.use('/api', orderRouter);
app.get('/', (req, res) => {
  res.send('Stationery Product Database');
});

export default app;
