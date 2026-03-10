import express from "express";
const router = express.Router();

import{
    createTask,
    getAllTasks,
    getSpecifiTask,
    getNewTask,
    deleteTask,
    updateTask
} from "../controllers/task.Controller";

import { authenticate , authorizedAdmin } from "../middlewares/authMiddleware";
import checkId from "../middlewares/checkId";
router.get("/all-tasks" , getAllTasks);
router.get("/specific-task" , getSpecifiTask);
router.get("/new-task" , getNewTask);

router.post("/create-task" , authenticate , authorizedAdmin , createTask);
router.put("/update-task" , authenticate ,authorizedAdmin  , updateTask);
router.delete("/delete-task" , authenticate ,authorizedAdmin , deleteTask);

export default router;