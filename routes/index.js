import { Router } from "express";
import userRouter from "./userRoute.js";
// import profileRouter from "./profileRoute.js";
const router = Router();
const routes = [
  {
    route: "/user",
    router: userRouter,
  },
  // {
  //   route: "/todo",
  //   router: profileRouter,
  // },
];

routes.map((route) => {
  router.use(route.route, route.router);
});

export default router;
