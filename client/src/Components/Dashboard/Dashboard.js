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

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: ""
			// photoURL: this.props.user.photoURL,
			// displayName: this.props.user.displayName,
			// email: this.props.user.email
		};
	}

	constructMessage() {
		var fakeEvents = [
			{
				name: "Michael Smith",
				company: "Microsoft",
				date: "May 5th, 4:30pm",
				location: "Microft chicago 3rd floor room 345",
				news: "Microsoft has recently dealt with a market crash",
				meetingHistory: 3,
				companyInfo: "Microsoft is a tech company"
			}
		]

		// Basically take info above and make template for nice email.
		console.log(this.props.root)
	}

	send(user1, message1) {
		var emailjs = require('emailjs-com')
		var service_id = "default_service";
	  var template_id = " template_vnqh5vdO";
		var user_id =  "user_5wah7rPNg4BH4ntQ0325x";
		var params = {
			'to_email':this.props.user.email,
			'user': user1.toString(),
			'message': message1.toString()
		}

		emailjs.send("gmail", "template_vnqh5vdO", params, user_id)
  	.then(function(){
    	console.log('success')
    }, function(err) {
       console.log('fail: ', err)
    });
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
						onClick={this.send.bind('Sadie', 'You are meeting with _ and _ and _ today!')}
					>
						<MaterialIcon icon="navigation"/>
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
