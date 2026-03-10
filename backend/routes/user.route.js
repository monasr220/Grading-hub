import express from "express";

import {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile
} from "../controllers/user.controller";

import {authenicate , authorizedAdmin} from "../middlewares/authMiddleware";

const router  = express.Router();
router
    .route("/")
    .post(createUser)
    .get(authenicate , authorizedAdmin , getAllUsers);

router.post("/auth" , loginUser);
router.post("/logout" , logoutCurrentUser);

router 
    .route("/profiel")
    .get(authenicate , getCurrentUserProfile)
    .put(authenicate , updateCurrentUserProfile);

export default router;