require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONG_URI)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

const mainRouter = require("./Routes/router");
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/api', mainRouter); 

app.listen(process.env.PORT , () => {
    console.log("Server started on port 3001");
});  