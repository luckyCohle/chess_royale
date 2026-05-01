import express from 'express';
import { userRouter } from '../../modules/user/user.controller'
import cors from "cors";
export async function startHttpServer() {
  const app = express();
  app.use(cors())
  app.use(express.json());
  app.use('/users', userRouter);

  app.listen(5000, () => {
    console.log('HTTP server running on port 5000');
  });
}