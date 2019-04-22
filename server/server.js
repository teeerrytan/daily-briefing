const express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var redis = require("redis");
var RedisStore = require("connect-redis")(session);
const bodyParser = require("body-parser");
const firebase = require("firebase");
const config = require("./firebaseKey.json");
const port = process.env.PORT || 5000;

//initialize firebase
firebase.initializeApp(config);

var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
var redisClient = redis.createClient(6379, "127.0.0.1", {
	auth_pass: "password"
});

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
	session({
		store: new RedisStore({ client: redisClient }),
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
		secret: "password",
		resave: false,
		saveUninitialized: false
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
			req.session.user = user;
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
			//login process
		}
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

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).render("error");
});

//log that server is up and running
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
