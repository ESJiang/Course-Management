require("dotenv").config();
const express = require("express"),
    cors = require("cors"),
    app = express(),
    PORT = process.env.PORT || 8000,
    connectDB = require("./db"),
    router = require("./router/router");
connectDB();
app.use(
    cors({
        origin: "http://127.0.0.1:5500",
        methods: "GET,POST,OPTIONS,HEAD,PUT,DELETE,PATCH",
    })
);
app.use(express.json());
app.use("/api", router);
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
