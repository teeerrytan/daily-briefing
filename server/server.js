/* eslint-disable no-console */
const express = require("express");

const bodyParser = require("body-parser");
const firebase = require("firebase");
const { google } = require("googleapis");
const customsearch = google.customsearch("v1");
const config = require("./firebaseKey.json");
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

//initialize firebase
firebase.initializeApp(config);

var auth = firebase.auth();

//setting up middleware for retrieving data from front-end
const app = express();

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(bodyParser.json());

//post and get
//sign up
app.post("/signup/email", async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		let response;

		console.log("username: " + username + " password: " + password);
		await auth
			.createUserWithEmailAndPassword(username, password)
			.catch(error => {
				// Handle Errors here.
				//var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorMessage);
				response = errorMessage;
			});
		//if no error then
		if (!response) {
			response = "1";
		}
		console.log(response);
		res.send(response);
	} catch (e) {
		console.log(e);
		res.sendStatus(400);
	}
});

//email login
app.post("/login/email", async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;

		let response;

		await auth
			.signInWithEmailAndPassword(username, password)
			.catch(error => {
				// Handle Errors here.
				//var errorCode = error.code;
				var errorMessage = error.message;
				console.log("server.js error: " + errorMessage);
				response = {
					error: errorMessage
				};
			});
		//if no error then

		if (!response) {
			response = "1 " + auth.currentUser.uid;
		}
		console.log("server.js responds: ", response);
		res.json(response);
		//login process
	} catch (e) {
		res.sendStatus(400);
	}
});

app.post("/get/google", async (req, res) => {
	var searchCred = "AIzaSyDLYZcB2ApjyGw4Do1-aiqIq5LSq-a6mNI";
	const firstName = req.body.firstName;

	// var xhttp = new XMLHttpRequest();
	// xhttp.open(
	// 	"GET",
	// 	"https://www.googleapis.com/customsearch/v1?key=" +
	// 		searchCred +
	// 		"&cx=017576662512468239146:omuauf_lfve&q=lectures",
	// 	true
	// );
	// await xhttp.send();
	// res.json(xhttp.resonse);
	const response = await customsearch.cse.list({
		cx: "017576662512468239146:omuauf_lfve",
		q: "lectures",
		auth: "AIzaSyDLYZcB2ApjyGw4Do1-aiqIq5LSq-a6mNI"
	});
	console.log(response.data);
	return response.data;
});

app.use(function(err, req, res) {
	console.error(err.stack);
	res.status(500).render("error");
});

//log that server is up and running
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
