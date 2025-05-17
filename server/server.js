const express = require("express");
const app = express();
const PORT = 5000;

const cors = require("cors");
const corsOptions = {
    origin:["http://localhost:5173"]
};
const connect = require("./connect");

app.use(cors(corsOptions));
app.use(express.json());
app.get("/api", (req, res) => {
    res.json({fruits:["apple", "banana", "orange"]});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log("Server file mulai dijalankan");
