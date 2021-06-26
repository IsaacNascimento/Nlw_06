import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/EnsureAdmin";
// import { AuthenticateUserService } from "./services/AuthenticateUserService";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
// import { CreateComplimentService } from "./services/CreateComplimentService";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { EnsureAuthenticator } from "./middlewares/EnsureAuthenticator";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListTagController } from "./controllers/ListTagController";
import { ListUserController } from "./controllers/ListUserController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentsController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listTagsController = new ListTagController();
const listUserController = new ListUserController();

router.post(
  "/tags",
  EnsureAuthenticator,
  ensureAdmin,
  createTagController.handle
);

router.get("/tags", EnsureAuthenticator, listTagsController.handle);




router.post("/users", createUserController.handle);

router.get("/users", EnsureAuthenticator, listUserController.handle);

router.get(
  "/users/compliments/send",
  EnsureAuthenticator,
  listUserSendComplimentsController.handle
  );
  
router.get(
  "/users/compliments/receive",
  EnsureAuthenticator,
  listUserReceiveComplimentsController.handle
  );
  


  router.post("/login", authenticateUserController.handle);
  
  
  router.post(
  "/compliments",
  EnsureAuthenticator,
    createComplimentsController.handle
    );

export { router };