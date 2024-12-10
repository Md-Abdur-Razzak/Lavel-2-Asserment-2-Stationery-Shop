import { NextFunction, RequestHandler,Request,Response } from "express"

const caseAscync = (fn:RequestHandler)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
      Promise.resolve(fn(req,res,next)).catch(err=>next(err))
    }
  
  }

  export default caseAscync