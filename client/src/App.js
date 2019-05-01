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

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};
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

		if (success) {
			//update database
			var postData = {
				email: data.user.email,
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
				username: data.user.displayName
			};

			var updates = {};
			var snapshot = await firebase
				.database()
				.ref("/" + data.user.uid)
				.once("value");
			if (!snapshot) {
				updates["/" + data.user.uid] = postData;
				await ref.update(updates, () => {
					console.log("Database update successfully!");
				});
			}
		}

		console.log(data);
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
				email: data.user.email
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

		console.log(res);
		if (res == "1") {
			console.log("got here");
			const state = {
				user: {
					photoURL:
						"https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png",
					displayName: username,
					email: username
				},
				auth: true
			};

			this.saveState(state);

			this.props.dispatch(login(state));
			return "1";
		} else {
			return res;
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

		return;
	};

	render() {
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
							changePage={cur => this.changePage(cur)}
							photoURL={this.state.photoURL}
							displayName={this.state.displayName}
							email={this.state.email}
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
