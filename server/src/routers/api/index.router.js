import { Router } from "express";
import usersRouter from "./users.router.js";
import dishesRouter from "./dishes.router.js";
import cookiesRouter from "./cookies.router.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/dishes", dishesRouter);
apiRouter.use("/cookies", cookiesRouter);

export default apiRouter;
