const express = require("express");
const connectDB = require("./config/db");
const envObj = require("./config/env");
const propertyRoute = require("./routes/property");
const authRoute = require("./routes/auth");
const inquiryRoute = require("./routes/inquiry");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api/v1/property", propertyRoute);
server.use("/api/v1/auth", authRoute);
server.use("/api/v1/inquiry", inquiryRoute);

const port = process.env.PORT || envObj.port;

server.get("/", (req, res) => {
    res.send("LuxeNest backend is running!");
});

const startServer = async () => {
    try {
        await connectDB();
        server.listen(port, () => {
            console.log(`LuxeNest server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Unable to start the server:", error.message);
        process.exitCode = 1;
    }
};

startServer(); 