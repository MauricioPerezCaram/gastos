import { Router } from "express";
import usersRouter from "./users.router.js";
import dishesRouter from "./dishes.router.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/dishes", dishesRouter);

export default apiRouter;
