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
router.get("/specific-task/:id" , getSpecifiTask);
router.get("/new-task" ,checkId , getNewTask);

router.post("/create-task" , authenticate , authorizedAdmin , createTask);
router.put("/update-task/:id" , authenticate ,authorizedAdmin  , updateTask);
router.delete("/delete-task/:id" , authenticate ,authorizedAdmin , deleteTask);

export default router;