import express from "express";
import serverConfig from "./configs/server.config";
import pino from 'pino-http'
import routes from "./routes/index";
import corsConfig from "./configs/cors.config";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
app.use(pino());
app.use(cors(corsConfig));
app.use(cookieParser());
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