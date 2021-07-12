const express = require("express")

const app = express()

app.use(express.json()) //Used to parse JSON bodies No need for npm body-parser anymore
app.use(express.urlencoded({ extended: true })) //Parse URL-encoded bodies / No need for npm body-parser anymore

const userroute = require("./routes/userroute")

app.use("/api/user", userroute)

app.get("/", (req, res) => {
	res.send("This is the Backend")
})

app.listen(5005, () => {
	console.log("Server runs on port 5005")
})
