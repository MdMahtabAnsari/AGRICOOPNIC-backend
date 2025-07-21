import express from "express";
import serverConfig from "./configs/server.config";
import pino from 'pino-http'
import { clerkMiddleware } from "@clerk/express";
import routes from "./routes/index";
import corsConfig from "./configs/cors.config";
import cors from "cors";


const app = express();
app.use(pino());
app.use(cors(corsConfig));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        message: "Server is running smoothly"
    });
});


app.get("/", (req, res) => {
    res.send("Welcome to the API");
});
routes(app);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${serverConfig.PORT}`);
    }
);