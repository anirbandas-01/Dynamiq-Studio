import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import authRoutes from "./routes/authRoutes.js";
import appRoutes from "./routes/appRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/apps", appRoutes);
app.use("/data", dataRoutes);


app.listen(process.env.PORT  || 8000 , () => {
    console.log(`Server running on port ${process.env.PORT}`);
});