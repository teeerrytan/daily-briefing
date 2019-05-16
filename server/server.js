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
	const query = JSON.parse(req.body.query);
	var searchCred = "AIzaSyDLYZcB2ApjyGw4Do1-aiqIq5LSq-a6mNI";
	var tempName = query.name;
	const company = query.company;
	const news = query.tempName;
	const name = tempName.replace(/ /g, "+");

	var searchString = name + "+" + company;
	if (news) {
		searchString = company + "+news";
	}

	const response = await customsearch.cse.list({
		cx: "006675396895376221043:exnywglx5_8", // Specific search engine that we created... only contains a few websites
		q: searchString,
		auth: searchCred
	});
	console.log(response.data);
	const result = await JSON.stringify(response.data);
	res.send(result);
});

app.use(function(err, req, res) {
	console.error(err.stack);
	res.status(500).render("error");
});

//log that server is up and running
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
