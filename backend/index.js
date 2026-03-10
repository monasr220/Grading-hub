import express from "express";
import {cookieParser} from "cookie-parser";
import {dotenv} from "dotenv";
import path from "path";

//Files

import connectDB from "./config/db";
import userRoutes from "./routes/user.route";
import taskRoutes from "./routes/task.route";
import subRoutes from "./routes/sub.route";
import uploadRoutes from "./routes/upload.route";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/sub", subRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));