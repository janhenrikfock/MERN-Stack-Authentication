const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

mongoose.connect(
	"mongodb://localhost:27017/mern-authentication",
	{ useNewUrlParser: true, useUnifiedTopology: true },
	function (err) {
		if (err) {
			console.log(err)
		} else {
			console.log("mongodb connection successful")
		}
	}
)

let Usermodel = mongoose.model("users", {
	name: String,
	username: String,
	password: String,
})

router.post("/registeruser", function (req, res) {
	console.log(req.body)
	let newUser = new Usermodel({
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
	})
	newUser.save((err) => {
		if (err) {
			res.send("something went wrong")
		} else {
			res.send("Registration successful")
		}
	})
})

router.post("/loginuser", function (req, res) {
	console.log(req.body.username)
	Usermodel.find(
		{ username: req.body.username, password: req.body.password },
		function (err, documents) {
			if (err) {
				res.send("Something went wrong")
			} else {
				if (documents.length == 0) {
					res.send("Login failed")
				} else {
					res.send("Login successful")
				}
			}
		}
	)
})

router.post("/getusers", function (req, res) {
	Usermodel.find({}, function (err, documents) {
		if (err) {
			res.send("Something went wrong")
		} else {
			res.send(documents)
		}
	})
})

module.exports = router
