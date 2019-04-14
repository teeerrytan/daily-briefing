const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("firebase");
const port = process.env.PORT || 5000;

const config = {
	apiKey: "AIzaSyAqc38N6jHL-tIb1lMTczQbqTnWFtZ8QYY",
	authDomain: "daily-briefing-6b6e2.firebaseapp.com",
	databaseURL: "https://daily-briefing-6b6e2.firebaseio.com",
	projectId: "daily-briefing-6b6e2",
	storageBucket: "daily-briefing-6b6e2.appspot.com",
	messagingSenderId: "534149453117"
};

//initialize firebase
firebase.initializeApp(config);

var auth = firebase.auth();

//setting up middleware for retrieving data from front-end
const app = express();

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

app.use(bodyParser.json());

//log that server is up and running
app.listen(port, () => console.log(`Server is running on port ${port}...`));

//post and get
//sign up
app.post("/signup/user", async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		console.log("username: " + username + " password: " + password);
		const promise = auth.createUserWithEmailAndPassword(username, password);
		promise
			.then(info => {
				res.send(info);
			})
			.catch(error => {
				// Handle Errors here.
				//var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorMessage);
				res.send(errorMessage);
			});
		//login process
	} catch (e) {
		console.log(e);
		res.sendStatus(400);
	}
});

//login
app.post("/login/user", async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		await auth
			.signInWithEmailAndPassword(username, password)
			.catch(error => {
				// Handle Errors here.
				//var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorMessage);
			});
		console.log(`${username} logged in!`);
		//login process
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});
