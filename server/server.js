/* eslint-disable no-console */
const express = require("express");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const firebase = require("firebase");
const config = require("./firebaseKey.json");
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

//initialize firebase
firebase.initializeApp(config);

var auth = firebase.auth();
var db = firebase.database();
var ref = db.ref("/data");
var provider = new firebase.auth.GoogleAuthProvider();

//setting up middleware for retrieving data from front-end
const app = express();

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(bodyParser.json());

//save session information in redis store
app.use(cookieParser("sessiontest"));
app.use(
	cookieSession({
		name: "session",
		keys: ["daily-breifing"],

		// Cookie Options
		maxAge: 24 * 60 * 60 * 1000 // 24 hours
	})
);

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
		if (req.session.user) {
			var user = req.session.user;
			var username = user.username;
			var password = user.password;
			let response;
			await auth
				.signInWithEmailAndPassword(username, password)
				.catch(error => {
					// Handle Errors here.
					//var errorCode = error.code;
					var errorMessage = error.message;
					console.log("server.js error: " + errorMessage);
					response = errorMessage;
				});
			//if no error then
			if (!response) {
				response = "1";
			}
			console.log("server.js responds: " + response);
			res.send(response);
		} else {
			const username = req.body.username;
			const password = req.body.password;
			let user = {
				username: username,
				password: password
			};
			let response;

			await auth
				.signInWithEmailAndPassword(username, password)
				.catch(error => {
					// Handle Errors here.
					//var errorCode = error.code;
					var errorMessage = error.message;
					console.log("server.js error: " + errorMessage);
					response = errorMessage;
				});
			//if no error then
			if (!response) {
				response = "1";
				req.session.user = user;
			}
			console.log("server.js responds: " + response);
			res.send(response);
			//login process
		}
	} catch (e) {
		res.sendStatus(400);
	}
});

//Google login, don't use for now
app.post("/login/google", async (req, res) => {
	try {
		console.log("run!");
		let user;
		let respond;
		await auth
			.signInWithPopup(provider)
			.then(result => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				// eslint-disable-next-line no-unused-vars
				var token = result.credential.accessToken;
				// The signed-in user info.
				user = result.user;
				console.log(user);
				// ...
			})
			.catch(function(error) {
				respond = error;
			});
		if (!respond) {
			//update database
			var postData = {
				email: user.email,
				events: {
					event3: {
						company: "test",
						key: "1",
						name: "test",
						time: "test"
					}
				},
				pastEvents: {
					event1: {
						company: "test",
						key: "2",
						name: "test",
						time: "test"
					}
				},
				username: user.displayName
			};

			var updates = {};
			var snapshot = await ref("/" + user.email).once();
			console.log(snapshot);
			if (!snapshot) {
				updates["/" + user.email] = postData;
				await ref.update(updates);
			}
		}
		console.log(`${user} logged in!`);
		res.send(user);
		//login process
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

app.use(function(err, req, res) {
	console.error(err.stack);
	res.status(500).render("error");
});

//log that server is up and running
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
