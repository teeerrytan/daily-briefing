import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import firebase from "firebase";
import { connect } from "react-redux";
import { login } from "./Actions/actions";
import Loading from "./Components/Loading";
import Dashboard from "./Components/Dashboard";

var config = {
	apiKey: "AIzaSyAqc38N6jHL-tIb1lMTczQbqTnWFtZ8QYY",
	authDomain: "daily-briefing-6b6e2.firebaseapp.com",
	databaseURL: "https://daily-briefing-6b6e2.firebaseio.com",
	projectId: "daily-briefing-6b6e2",
	storageBucket: "daily-briefing-6b6e2.appspot.com",
	messagingSenderId: "534149453117"
};
firebase.initializeApp(config);

const auth = firebase.auth();

class App extends Component {
	constructor(props) {
		super(props);

		this.onLogin = this.onLogin.bind(this);
		this.state = {
			currentPage: "Signin",
			photoURL: this.props.photoURL,
			displayName: this.props.displayName,
			email: this.props.email
		};
	}

	onLogin(user) {
		this.props.onLogin(user);
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

	signInWithGoogle = () => {
		const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(googleAuthProvider)
			.then(data => {
				console.log(data);
				//update store
				// this.setState({
				// 	photoURL: data.user.photoURL,
				// 	displayName: data.user.displayName,
				// 	email: data.user.email
				// });
				const user = {
					photoURL: data.user.photoURL,
					displayName: data.user.displayName,
					email: data.user.email
				};

				this.onLogin(user);
				this.changePage("Dashboard");

				//update store
			})
			.catch(error => {
				console.log(error);
			});
	};

	//email login
	userEmailLogin = (username, password) => {
		// Example postRequest with data. Replace static with form input.
		this.postRequest("/login/email", {
			username: username,
			password: password
		})
			.then(res => {
				if (res == "1") {
					//TODO: update store

					//change page
					this.setState({
						APISuccess: true
					});
					this.changePage("Dashboard");
				}
				//TODO: user data process
				console.log("api answered!" + res);
			})
			.catch(err => console.log(err));
	};

	//Google login
	userGoogleLogin() {
		this.signInWithGoogle();
		// Example postRequest with data. Replace static with form input.
		// this.postRequest("/login/google", {
		// 	temp: "Google"
		// })
		// 	.then(res => {
		// 		//TODO: update store
		// 		//TODO: user data process
		// 		console.log("api answered!  " + res);
		// 		return res;
		// 	})
		// 	.catch(err => console.log(err));
	}

	//sign up
	userSignup = (username, password) => {
		// Example postRequest with data. Replace static with form input
		this.postRequest("/signup/email", {
			username: username,
			password: password
		})
			.then(res => {
				//TODO: update store

				//TODO: user data process
				console.log("api answered!  ");
				return res;
			})
			.catch(err => console.log(err));
	};

	changePage(value) {
		this.setState({
			currentPage: value
		});
	}

	render() {
		console.log(this.props.state);
		//switch page based on the value "currentPage" in store. Easier implementation than routers
		switch (this.state.currentPage) {
			case "Dashboard":
				return (
					<Dashboard
						changePage={cur => this.changePage(cur)}
						photoURL={this.state.photoURL}
						displayName={this.state.displayName}
						email={this.state.email}
					/>
				);
			case "Signup":
				return (
					<Signup
						userSignup={(username, password) =>
							this.userSignup(username, password)
						}
						changePage={cur => this.changePage(cur)}
					/>
				);
			case "Signin":
				return (
					<Signin
						userEmailLogin={(username, password) =>
							this.userEmailLogin(username, password)
						}
						userGoogleLogin={() => this.userGoogleLogin()}
						changePage={cur => this.changePage(cur)}
					/>
				);
			case "Loading":
				return <Loading />;
			default:
				return (
					<Signin
						userEmailLogin={(username, password) =>
							this.userEmailLogin(username, password)
						}
						userGoogleLogin={() => this.userGoogleLogin()}
						changePage={cur => this.changePage(cur)}
					/>
				);
		}
	}
}

const mapStateToProps = state => ({
	email: state.email,
	displayName: state.displayName,
	photoURL: state.photoURL,
	auth: state.auth
});

const mapActionsToProps = {
	onLogin: login
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(App);
