import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express()

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credential: true
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1.0/user", userRouter)

export default app;