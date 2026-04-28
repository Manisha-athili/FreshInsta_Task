import express from "express";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5
});


app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;