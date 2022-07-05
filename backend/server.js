require("dotenv").config();
const connectToMongo = require("./db/db.js");
connectToMongo();


// requiring modules
const cookieParser = require('cookie-parser');


let cors = require("cors");

const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/v1", require("./routes/categoryRoutes"));
app.use("/api/v1", require("./routes/categoryRoutes"));

app.get('/', (req, res) => {
  res.send('Hello ashley!')
})

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is Running.`);
});
