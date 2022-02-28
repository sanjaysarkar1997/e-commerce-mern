import { infoLog } from "../services/logServices";

const demoMiddleWare = (req: any, res: any, next: any) => {
  infoLog("Middleware called");
  next();
};

export default demoMiddleWare;
