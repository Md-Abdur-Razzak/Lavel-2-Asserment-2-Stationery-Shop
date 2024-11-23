import  express  from "express";
import { orderController } from "./order.controller";
const orderRouter = express.Router()
orderRouter.post("/orders",orderController.geithingOrder)
orderRouter.get("/orders/revenue",orderController.calculteRevenue)

export default orderRouter