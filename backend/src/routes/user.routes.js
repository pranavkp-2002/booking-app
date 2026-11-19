import { Router } from "express";
import { listUsers } from "../controllers/user.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protect, authorize("super_admin"), listUsers);

export default router;
