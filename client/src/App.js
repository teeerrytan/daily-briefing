import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import firebase from "firebase";
import { connect } from "react-redux";
import { login } from "./Actions/actions";
import Loading from "./Components/Loading/Loading";
import Dashboard from "./Components/Dashboard/Dashboard";
import NotFound from "./Components/NotFound/NotFound";
import { Switch, Route } from "react-router-dom";
const config = require("./firebaseKey.json");

firebase.initializeApp(config);

const auth = firebase.auth();
var db = firebase.database();
var ref = db.ref("/data");
var userRef = db.ref("/data/users");
var searchCred = "AIzaSyDLYZcB2ApjyGw4Do1-aiqIq5LSq-a6mNI"

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userData: {}
		};
	}
	componentDidMount() {
		// this.setState({ currentPage: this.props.currentPage });
	}

	//universal http interface
	getRequest = async route => {
		const res = await axios.get(route);
		if (res.status !== 200) {
			throw Error(res.message);
		}
		return res.data;
	};


	postRequest = async (route, data = null) => {
		if (!data) {
			throw Error("Cannot send post request without data");
		} else {
			const res = await axios.post(route, data);

			if (res.status !== 200) {
				throw Error(res.message);
			}
			return res.data;
		}
	};
	//not in use
	checkIfLoggedIn = () => {
		if (localStorage.getItem("firebase_idToken")) {
		}
	};

	signInWithGoogle = async () => {
		const googleAuthProvider = await new firebase.auth.GoogleAuthProvider();
		let success = true;

		const data = await auth
			.signInWithPopup(googleAuthProvider)
			.catch(error => {
				console.log(error);
				success = false;
			});
		this.setState({
			userData: data
		});

		if (success) {
			//update database
			let snapshot = await firebase
				.database()
				.ref("/data/users/" + data.user.uid)
				.once("value");

			if (!snapshot.val()) {
				console.log("no snapshot");
				var updates = {};
				var updateData = {
					email: data.user.email,
					username: data.user.displayName,
					curEventId: 5
				};

				updates["/" + data.user.uid] = updateData;
				localStorage.setItem("curEventId", 5);
				await userRef.update(updates);
			} else {
				localStorage.setItem("curEventId", snapshot.val().curEventId);
			}
		}

		//update store
		// this.setState({
		// 	photoURL: data.user.photoURL,
		// 	displayName: data.user.displayName,
		// 	email: data.user.email
		// });
		const state = {
			user: {
				photoURL: data.user.photoURL,
				displayName: data.user.displayName,
				email: data.user.email,
				uid: data.user.uid
			},
			auth: true
		};
		this.saveState(state);
		this.props.dispatch(login(state));
		console.log("success content is: " + success);
		return success;
	};

	//email login
	userEmailLogin = async (username, password) => {
		// Example postRequest with data. Replace static with form input.
		const res = await this.postRequest("/login/email", {
			username: username,
			password: password
		}).catch(err => console.log(err));

		console.log("email login user data: ", res);
		let ans = res.split(" ");
		if (ans[0] == "1") {
			let uid = ans[1];
			console.log("got here");
			const state = {
				user: {
					photoURL:
						"https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png",
					displayName: username,
					email: username,
					uid: uid
				},
				auth: true
			};

			//update database
			let snapshot = await firebase
				.database()
				.ref("/data/users/" + uid)
				.once("value");

			if (!snapshot.val()) {
				var updates = {};
				var updateData = {
					email: username,
					username: username,
					curEventId: 5
				};

				updates["/" + uid] = updateData;
				localStorage.setItem("curEventId", 5);
				await userRef.update(updates);
			} else {
				localStorage.setItem("curEventId", snapshot.val().curEventId);
			}

			this.saveState(state);

			this.props.dispatch(login(state));
			return "1";
		} else {
			return res.error;
		}
	};

	//sign up
	userSignup = async (username, password) => {
		// Example postRequest with data. Replace static with form input
		const res = await this.postRequest("/signup/email", {
			username: username,
			password: password
		}).catch(err => console.log(err));
		return res;
	};

	saveState = state => {
		localStorage.setItem("displayName", state.user.displayName);
		localStorage.setItem("email", state.user.email);
		localStorage.setItem("photoURL", state.user.photoURL);
		localStorage.setItem("auth", state.auth);
		localStorage.setItem("uid", state.user.uid);

		return;
	};

	addEvent = async userData => {
		var updates = {};
		var curEventId = Number(localStorage.getItem("curEventId")) + 1;
		var updateData = {
			company: userData.company,
			name: userData.name,
			time: userData.time
		};
		updates["/" + localStorage.getItem("uid") + "/curEventId"] = curEventId;
		updates[
			"/" +
				localStorage.getItem("uid") +
				"/events/".concat(`${userData.id}`)
		] = updateData;

		await userRef.update(updates);

		localStorage.setItem("curEventId", curEventId);
		return;
	};

	deleteEvent = async userData => {
		var updates = {};
		updates[
			"/" +
				localStorage.getItem("uid") +
				"/events/".concat(`${userData.id}`)
		] = null;

		await userRef.update(updates);

		return;
	};

	getGoogle = async () => {
		const res = await this.postRequest("/get/google", {
		}).catch(err => console.log(err));
		JSON.stringify(res)
	}

	render() {
		console.log("User Data: ", this.state.userData);
		return (
			<Switch>
				<Route
					exact
					path="/"
					render={props => (
						<Signin
							userEmailLogin={(username, password) =>
								this.userEmailLogin(username, password)
							}
							signInWithGoogle={() => this.signInWithGoogle()}
						/>
					)}
				/>
				<Route
					path="/signin"
					render={props => (
						<Signin
							userEmailLogin={(username, password) =>
								this.userEmailLogin(username, password)
							}
							signInWithGoogle={() => this.signInWithGoogle()}
						/>
					)}
				/>
				<Route
					path="/signup"
					render={props => (
						<Signup
							userSignup={(username, password) =>
								this.userSignup(username, password)
							}
						/>
					)}
				/>
				<Route
					path="/dashboard"
					render={props => (
						<Dashboard
							addEvent={userData => this.addEvent(userData)}
							deleteEvent={userData => this.deleteEvent(userData)}
							changePage={cur => this.changePage(cur)}
							getGoogle={() => this.getGoogle()}
							photoURL={this.state.photoURL}
							displayName={this.state.displayName}
							email={this.state.email}
							uid={this.state.uid}

						/>
					)}
				/>
				<Route path="/loading" Component={Loading} />
				<Route render={() => <NotFound />} />
			</Switch>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
		auth: state.auth,
		currentPage: state.currentPage
	};
};

export default connect(mapStateToProps)(App);
