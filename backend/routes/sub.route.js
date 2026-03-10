import express from "express";
const router  = express.Router();

import {
createSub,
updateSub,
removeSub,
listSub,
readSub} from "../controllers/submission.Controller";

import {authenticate , authorizeAdmin}from "../middlewares/authMiddleware";
router.route("/").post(authenticate,authorizeAdmin,createSub);
router.route("/:id").put(authenticate,authorizeAdmin,updateSub);
router.route("/:id").delete(authenticate,authorizeAdmin,removeSub);
router.route("/submission").get(listSub);
router.route("/:id").get(readSub);

export default router;