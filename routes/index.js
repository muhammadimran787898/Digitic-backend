import { Router } from "express";
import userRoute from "./userRoute.js";
import blogRoute from "./blogRoute.js";

const router = Router();

router.use("/user", userRoute);
router.use("/blog", blogRoute);

// const routesConfig = [
//   {
//     path: "/user",
//     router: userRoute,
//   },
//   {
//     path: "/doctor",
//     router: doctorRoute,
//   },
// ];
// for (let index = 0; index < routesConfig.length; index++) {
//   const route = routesConfig[index];
//   router.use(route.path, route.router);
// }

export default router;
