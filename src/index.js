const express = require("express");
const cors = require('cors')
const route = require("./routes/api/v1/index");
const connectdb = require("./db/mongoosedb");
const cookieParser = require('cookie-parser');



const app = express();
app.use(cookieParser());
app.use(cors())

app.use(express.json())
app.use("/api/v1",route);
connectdb();


app.listen(8000,()=>{
    console.log("server created 8000");
})
