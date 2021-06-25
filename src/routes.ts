import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController  } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/EnsureAdmin";
// import { AuthenticateUserService } from "./services/AuthenticateUserService";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
// import { CreateComplimentService } from "./services/CreateComplimentService";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentsController = new CreateComplimentController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", createComplimentsController.handle);

export { router }