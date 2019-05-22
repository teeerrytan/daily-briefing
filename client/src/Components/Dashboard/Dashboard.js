import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./Dashboard.css";
import blueGrey from "@material-ui/core/colors/blueGrey";
import MaterialIcon from "@material/react-material-icon";
import Fab from "@material-ui/core/Fab";
import Header from "../Header/Header";
import { connect } from "react-redux";
import List from "../List/List";
// import { sendEmail } from "../../Actions/actions.js"

const styles = theme => ({
	signin: {
		color: theme.palette.getContrastText(blueGrey[700]),
		backgroundColor: blueGrey[500],
		"&:hover": {
			backgroundColor: blueGrey[700]
		}
	},
	signup: {
		color: theme.palette.getContrastText(blueGrey[200]),
		backgroundColor: blueGrey[50],
		"&:hover": {
			backgroundColor: blueGrey[100]
		}
	},
	dialog: {
		minWidth: 500,
		minHeight: 300
	},
	dialogTitle: {
		backgroundColor: "#4c5870",
		"& h2": { color: "white" }
	},
	dialogContent: {
		marginTop: 30,
		minWidth: 350,
		minHeight: 40
	},
	dialogText: {
		fontSize: 18,
		color: "black"
	},
	sendButton: {
		marginTop: "30px",
		marginBottom: "50px",
		width: "50%",
		minWidth: 230,
		maxWidth: 300,
		background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
		borderRadius: 6,
		border: 0,
		color: "white",
		height: "48px",
		padding: "0 30px",
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, 0.3)"
	}
});

var searchCred = "AIzaSyDLYZcB2ApjyGw4Do1-aiqIq5LSq-a6mNI";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "",
			// photoURL: this.props.user.photoURL,
			// displayName: this.props.user.displayName,
			// email: this.props.user.email,
			searchResponse: null
		};
	}

	async getSearch(results) {
		const result = await this.props.getGoogle();
		console.log(result);
	}

	constructMessage() {
		const eventsList = JSON.parse(localStorage.getItem("events"));

		//event sample
		// {
		// 	name: events.name,
		// 	company: events.company,
		// 	time: events.time,
		//  location: // todo
		// 	title:
		// 		events.result.title
		//  meetings: // todo
		// }

		// var fakeEvents = [
		// 	{
		// 		name: "Thomas Delaney",
		// 		company: "Enodo",
		// 		time: "Thursday May 16th at 9:30am",
		// 		location: "Generic Address",
		// 		title:
		// 			"Thomas Delaney - Chief Operating Officer - Enodo Inc | LinkedIn",
		// 		meetings: 0,
		// 		news: ""
		// 	},
		// 	{
		// 		name: "Robert Johnson",
		// 		company: "Enodo",
		// 		time: "Thursday May 16th at 11:30am",
		// 		location: "Generic Address",
		// 		title:
		// 			"Robert A Johnson - Product Manager - Enodo Inc | LinkedIn",
		// 		meetings: 3,
		// 		news: ""
		// 	},
		// 	{
		// 		name: "Lindsay Slutzky",
		// 		company: "Jiobit",
		// 		time: "Thursday May 16th at 3:30pm",
		// 		location: "Generic Address",
		// 		title:
		// 			"Lindsay Slutzky - Head Of Media Relations - Jiobit | LinkedIn",
		// 		meetings: 2,
		// 		news:
		// 			"You Can Now Learn Hawaii's Native Language Using An App | Here ..."
		// 	},
		// 	{
		// 		name: "John Renaldi",
		// 		company: "Enodo",
		// 		time: "Thursday May 16th at 4:30pm",
		// 		location: "Generic Address",
		// 		title: "John Renaldi - Co-Founder & CEO - Jiobit | LinkedIn",
		// 		meetings: 0,
		// 		news: ""
		// 	}
		// ];

		let message = "Hello User, \n \n";
		message +=
			"Tomorrow, you have " +
			eventsList.length +
			" meetings throughout the day. Details about these meetings are listed below. \n \n \n";

		eventsList.forEach(events => {
			message += "On " + events.time;
			message +=
				" you are meeting with " +
				events.name +
				" from " +
				events.company +
				". ";

			let userTitle = events.result.title;

			message +=
				events.name +
				" is the" +
				userTitle +
				"for " +
				events.company +
				". ";

			// if (events.meetings === 0) {
			// 	message += "You have not met with " + events.name + " before.";
			// } else {
			// 	message +=
			// 		"You have met with " +
			// 		events.name +
			// 		" " +
			// 		events.meetings.toString() +
			// 		" times before.";
			// }
			if (events.news === "") {
				message +=
					" There has not been any big news surrounding " +
					events.company +
					" recently. ";
			} else {
				message +=
					" There has been some recent news surrounding " +
					events.company +
					" regarding how " +
					events.result.title +
					". ";
			}
			message += "\n \n";
		});

		message +=
			"You will receive information regarding your meetings tomorrow at midnight before any of your meetings.";
		message +=
			"Thank you for using Daily Briefing for your everyday meeting needs. \n";
		message += "Sincerely, \n";
		message += "Daily Briefing Team \n \n \n ";
		message += "If you'd like to unsubscribe please click here link. \n";

		console.log(message);

		// Basically take info above and make template for nice email.
		console.log(message);

		this.send("sadie.j.hood@gmail.com", "Sadie", message);
	}

	send(email, user1, message1) {
		var emailjs = require("emailjs-com");
		var service_id = "default_service";
		var template_id = " template_vnqh5vdO";
		var user_id = "user_5wah7rPNg4BH4ntQ0325x";
		var email1 = "sadie.j.hood@gmail.com";
		var params = {
			to_email: email1,
			user: user1.toString(),
			message: message1.toString()
		};

		emailjs.send("gmail", "template_vnqh5vdO", params, user_id).then(
			function() {
				console.log("success");
			},
			function(err) {
				console.log("fail: ", err);
			}
		);
	}

	render() {
		const { classes } = this.props;
		console.log("Dashboard page states: \n", this.state);
		// console.log(this.props)
		return (
			<div className="Dashboard">
				<Header
					className="logo"
					photoURL={this.state.photoURL}
					displayName={this.state.displayName}
					email={this.state.email}
					page="dashboard"
				/>
				<header className="Dashboard-header">
					<p className="Dashboard-title"> Your Dashboard </p>
					<List
						addEvent={userData => this.props.addEvent(userData)}
						deleteEvent={userData =>
							this.props.deleteEvent(userData)
						}
						uid={this.props.uid}
					/>

					<Fab
						variant="extended"
						color="primary"
						aria-label="Add"
						className={classes.sendButton}
						onClick={() => this.constructMessage()}
						// onClick={this.send.bind(this.state.email,'Sadie', 'You are meeting with _ and _ and _ today!')}
					>
						<MaterialIcon icon="navigation" />
						&nbsp;Send Email to Me
					</Fab>
				</header>
			</div>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(Dashboard));
