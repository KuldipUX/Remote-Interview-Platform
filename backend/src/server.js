import express from "express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {serve} from 'inngest/express'
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from '@clerk/express'
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from './routes/chatRoutes.js'
import sessionRoutes from './routes/sessionRoute.js'

const app = express();

app.use(express.json());
//credentials:true meaning?? => server allows a browser to include cookies on request

app.get("/health",(req,res)=>{
    res.status(200).json({message:"Success from api"})
});
app.use("/api/chat",chatRoutes)
app.get("/video-calls",protectRoute,(req,res)=>{
    
    res.status(200).json({msg:"video call endpoint"})
});
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use("/api/inngest",serve({client:inngest,functions}))
app.use(clerkMiddleware());//this adds auth field to request object: req.auth()
const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log(`Server is running on port ${ENV.PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};
startServer();