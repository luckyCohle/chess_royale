import { Router } from "express";
import { createUser, getUserData, loginUser } from "../user/user.repository";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../../server/http/middleware";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const result = await createUser(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.msg || "signup failed",
    });
  }

  const token = jwt.sign(
    { userId: result.userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  res.json({
    success: true,
    token,
  });
});
userRouter.post("/login", async (req, res) => {
  const result = await loginUser(req.body.email, req.body.password);

  if (!result.success) {
    return res.status(401).json({
      message: result.msg || "invalid credentials",
    });
  }

  const token = jwt.sign(
    { userId: result.userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  res.json({
    success: true,
    token,
  });
});
userRouter.get("/userData",authMiddleware,async (req:any,res)=>{
  const id = req.user.userId;
  const data = await getUserData(id);
  res.json(data);
})
export default userRouter