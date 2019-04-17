const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("firebase");
const config = require("./firebaseKey.json");
const port = process.env.PORT || 5000;

//initialize firebase
firebase.initializeApp(config);

var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

//setting up middleware for retrieving data from front-end
const app = express();

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(bodyParser.json());

//log that server is up and running
app.listen(port, () => console.log(`Server is listening on port ${port}...`));

//post and get
//sign up
app.post("/signup/email", async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		let response;

		console.log("username: " + username + " password: " + password);
		const promise = auth.createUserWithEmailAndPassword(username, password);
		promise
			.then(info => {
				response = info;
			})
			.catch(error => {
				// Handle Errors here.
				//var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorMessage);
				response = errorMessage;
			});
		if (!response) {
			response = `${username} signed up!`;
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
				console.log(errorMessage);
				response = errorMessage;
			});
		if (!response) {
			response = "1";
		}
		console.log(response);
		res.send(response);
		//login process
	} catch (e) {
		res.sendStatus(400);
	}
});

//Google login, don't use for now
app.post("/login/google", async (req, res) => {
	try {
		let user;
		await auth
			.signInWithPopup(provider)
			.then(function(result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				user = result.user;
				// ...
			})
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
			});
		console.log(`${user} logged in!`);
		res.send(user);
		//login process
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});
