import express from "express";

import {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile
} from "../controllers/user.controller";

import {authenticate , authorizedAdmin} from "../middlewares/authMiddleware";

const router  = express.Router();
router
    .route("/")
    .post(createUser)
    .get(authenticate , authorizedAdmin , getAllUsers);

router.post("/auth" , loginUser);
router.post("/logout" , logoutCurrentUser);

router 
    .route("/profile")
    .get(authenticate , getCurrentUserProfile)
    .put(authenticate , updateCurrentUserProfile);


export default router;