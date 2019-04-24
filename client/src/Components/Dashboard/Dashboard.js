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
	margin: {
		margin: theme.spacing.unit
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
					page="dashboard"
				/>
				<header className="Dashboard-header">
					<p className="Dashboard-title"> DashBoard </p>
					<List />
					<hr className="hr-main" />
					<Fab
						variant="extended"
						color="primary"
						aria-label="Add"
						className={classes.margin}
					>
						<MaterialIcon icon="navigation" />
						Send Eamil to Me
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