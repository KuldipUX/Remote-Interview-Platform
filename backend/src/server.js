import express from "express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {serve} from 'inngest/express'
import { inngest, functions } from "./lib/inngest.js";



const app = express();

app.use(express.json());
//credentials:true meaning?? => server allows a browser to include cookies on request

app.get("/health",(req,res)=>{
    res.status(200).json({message:"Success from api"})
})
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use("/api/inngest",serve({client:inngest,functions}))
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