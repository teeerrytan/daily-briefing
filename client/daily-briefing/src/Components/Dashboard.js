import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./Dashboard.css";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Header from "./Header";
import { login } from "../Actions/actions";
import { connect } from "react-redux";
import List from "./List";

const mapDispatchToProps = {
	login
};

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

	//functions
	handleExit() {
		this.props.changePage("Signin");
	}

	render() {
		const { classes } = this.props;
		console.log("Dashboard page states: \n", this.state);
		return (
			<div className="Dashboard">
				<Header
					className="logo"
					photoURL={this.state.photoURL}
					displayName={this.state.displayName}
					email={this.state.email}
					handleExit={() => this.handleExit()}
				/>
				<header className="Dashboard-header">
					<p className="Dashboard-title"> DashBoard </p>
					<List />
					<hr className="hr-main" />
				</header>
			</div>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default connect(
	null,
	mapDispatchToProps
)(withStyles(styles)(Dashboard));
