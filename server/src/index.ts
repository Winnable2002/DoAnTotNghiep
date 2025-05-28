import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authMiddleware } from "./middleware/authMiddleware";
/* * Import routes * */
import tenantRoutes  from "./routes/tenantRoutes";
import managerRoutes  from "./routes/managerRoutes";


/** CONFIGURATION ** */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/** ROUTES ** */
app.get("/",  (req, res) => {
  res.send("This is HOME ROUTE");
});

app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes);
app.use("/managers", authMiddleware(["manager"]), managerRoutes);

/** SERVER ** */
const port = process.env.PORT || 3002;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });