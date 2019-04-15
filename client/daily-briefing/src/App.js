import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import firebase from "firebase";

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
	state = {
		currentPage: ""
	};
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
				//TODO: update store

				//TODO: user data process
				console.log("api answered!  " + res);
				return res;
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
		//switch page based on the value "currentPage" in store. Easier implementation than routers
		switch (this.state.currentPage) {
			case "Dashboard":
				return <Dashboard changePage={cur => this.changePage(cur)} />;
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

export default App;
