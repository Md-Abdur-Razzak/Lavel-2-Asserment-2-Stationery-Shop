import cors from 'cors';
import express, { Application , Request, Response,NextFunction} from 'express';
import router from './app/Model/StationeryProductModel/StationeryProduct.router';
import orderRouter from './app/Model/Order/order.router';
import config from './app/config';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);
app.use('/api', orderRouter);



// -------Error handaling from golobL ERROR----

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500; // Default to 500 if no status is set
  const errMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: err.name || "Error", // Use `err.name` if available, or default to "Error"
    errMessage, // Actual error message
    stack: config.node_env === "development" ? err.stack : undefined, // Include stack trace only in development
  });
});

app.get('/', (req, res) => {
  res.send('Stationery Product Database');
});


export default app;
