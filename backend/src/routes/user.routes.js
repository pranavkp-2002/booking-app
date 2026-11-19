import { Router } from "express";
import { listUsers } from "../controllers/user.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protect, authorize("admin"), listUsers);

export default router;
