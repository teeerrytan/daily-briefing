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
import { Switch, Route } from "react-router-dom";

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

		this.state = {};
	}
	componentDidMount() {
		this.setState({ currentPage: this.props.currentPage });
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
				const state = {
					user: {
						photoURL: data.user.photoURL,
						displayName: data.user.displayName,
						email: data.user.email
					},
					auth: true
				};

				this.props.dispatch(login(state));
				//update store
			})
			.catch(error => {
				console.log(error);
			});
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
			//TODO: update store
			console.log("got here");
			//change page

			const state = {
				user: {
					photoURL:
						"https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png",
					displayName: username,
					email: username
				},
				auth: true
			};

			this.props.dispatch(login(state));
			return "1";
		} else {
			return res;
		}
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
				//don't do if else here, leave it for func in signup page
				console.log("app.js returns " + res);
				return res;
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div>
				{/* switch (this.props.user.currentPage) {
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
					/>
				);
			case "Signin":
				return (
					<Signin
						userEmailLogin={(username, password) =>
							this.userEmailLogin(username, password)
						}
						userGoogleLogin={() => this.userGoogleLogin()}
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
					/>
				);
		} */}
				<Switch>
					<Route
						exact
						path="/"
						render={props => (
							<Signin
								userEmailLogin={(username, password) =>
									this.userEmailLogin(username, password)
								}
								userGoogleLogin={() => this.userGoogleLogin()}
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
								userGoogleLogin={() => this.userGoogleLogin()}
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
					<Route render={() => <div>Not Found</div>} />
				</Switch>
			</div>
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
