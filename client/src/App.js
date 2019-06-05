import React, { Component } from "react";
import ReactDOM from "react-dom";
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
var searchCred = "AIzaSyDLYZcB2ApjyGw4Do1-aiqIq5LSq-a6mNI";

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
		let events = [];

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
				await this.getEvents(snapshot.val().events, events);
			}
		}

		var str = await JSON.stringify(events);
		await localStorage.setItem("events", str);
		const state = {
			user: {
				photoURL: data.user.photoURL,
				displayName: data.user.displayName,
				email: data.user.email,
				uid: data.user.uid,
				events: events
			},
			auth: true
		};
		this.saveState(state);
		this.props.dispatch(login(state));
		console.log("success content is: " + success);
		console.log("events localStorage", localStorage.getItem("events"));

		return success;
	};

	getEvents = async (database, events) => {
		if (database) {
			for (let item of Object.values(database)) {
				let temp = {
					id: item.id,
					icon: "work",
					title: `Meeting with ${item.name} from ${item.company}`,
					subTitle: `${item.time}`.replace("T", " Time: "),
					result: item.result,
					name: item.name,
					time: `${item.time}`.replace("T", " Time: "),
					company: item.company
				};
				events.push(temp);
			}
		}
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
			let events = [];
			console.log("got here");

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
				await this.getEvents(snapshot.val().events, events);
			}

			const state = {
				user: {
					photoURL:
						"https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png",
					displayName: username,
					email: username,
					uid: uid,
					events: events
				},
				auth: true
			};

			var str = JSON.stringify(events);
			await localStorage.setItem("events", str);

			this.saveState(state);
			this.props.dispatch(login(state));
			console.log(localStorage.getItem("events"));
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
		//call search api
		const query = {
			person: {
				type: "person",
				name: userData.name,
				company: userData.company
			},
			company: {
				type: "company",
				name: userData.name,
				company: userData.company
			},
			stock: {
				type: "stock",
				name: userData.name,
				company: userData.company
			}
		};

		if (query) {
			const personQuery = JSON.stringify(query.person);
			const companyQuery = JSON.stringify(query.company);
			const stockQuery = JSON.stringify(query.stock);

			const personResult = await this.getGoogle(personQuery);
			const companyResult = await this.getGoogle(companyQuery);
			const stockResult = await this.getGoogle(stockQuery);

			console.log("personResult", personResult);
			console.log("companyResult", companyResult);
			console.log("stockResult", stockResult);
			//add to firebase

			var curEventId = Number(localStorage.getItem("curEventId")) + 1;

			var updateData = {
				company: userData.company,
				name: userData.name,
				time: `${userData.time}`.replace("T", " Time: "),
				id: curEventId,
				result: {
					person: {
						link: personResult.items[0].link,
						title: personResult.items[0].title
					},
					company: {
						link: companyResult.items[0].link,
						title: companyResult.items[0].title
					},
					stock: {
						link: stockResult.items[0].link,
						title: stockResult.items[0].title
					}
				},
				icon: "work",
				title: `Meeting with ${userData.name} from ${userData.company}`,
				subTitle: `${userData.time}`.replace("T", " Time: "),
				link: personResult.items[0].link
			};
			updates[
				"/" + localStorage.getItem("uid") + "/curEventId"
			] = curEventId;
			updates[
				"/" +
					localStorage.getItem("uid") +
					"/events/".concat(`${curEventId}`)
			] = updateData;

			await userRef.update(updates);

			localStorage.setItem("curEventId", curEventId);
			const events = JSON.parse(localStorage.getItem("events"));
			if (typeof events !== "undefined") {
				await events.push(updateData);
				const tempStr = await JSON.stringify(events);
				localStorage.setItem("events", tempStr);
			}
			return;
		} else {
			console.log("query is undefined!");
		}
	};

	deleteEvent = async userData => {
		const events = JSON.parse(localStorage.getItem("events"));
		if (typeof events !== "undefined") {
			for (let i = 0; i < events.length; i++) {
				if (events[i].id == userData.id) {
					//delete
					await events.splice(i, 1);
				}
			}
			const tempStr = await JSON.stringify(events);
			localStorage.setItem("events", tempStr);
		}

		var updates = {};
		updates[
			"/" +
				localStorage.getItem("uid") +
				"/events/".concat(`${userData.id}`)
		] = null;

		await userRef.update(updates);

		return;
	};

	getGoogle = async query => {
		try {
			const jsonRes = await this.postRequest("/get/google", {
				query: query
			}).catch(err => console.log(err));
			console.log(jsonRes);

			return jsonRes;
			// JSON.stringify(res);
		} catch (e) {
			console.log("error line 263: ", e);
		}
	};

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
