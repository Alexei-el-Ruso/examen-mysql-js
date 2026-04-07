const express = require("express");
const cors = require("cors")

const app = express();

app.use(cors());
app.use(express.json());
app.get("/")

app.listen(7654,  () => {
	console.log("Listening on port 7654");
})