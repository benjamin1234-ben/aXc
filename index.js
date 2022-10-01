import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

const { urlencoded, json } = bodyParser;
const { config } = dotenv;

const app = express();

app.use(express.static("public"));
app.use(urlencoded({"extended": false}));
app.use(json());

app.use(routes);

config();
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
    if(err) {
        console.log("Connection to server at port 3000 has failed.");
    } else {
        console.log("Connection to server at port 3000 is successful.");
    }
});