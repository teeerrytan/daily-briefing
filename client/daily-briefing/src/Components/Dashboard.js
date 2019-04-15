import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import "./Dashboard.css";
import Button from "@material-ui/core/Button";
import blueGrey from "@material-ui/core/colors/blueGrey";
import classNames from "classnames";
import Header from "./Header";
import { login } from "../Actions/actions";
import { connect } from "react-redux";

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
			photoURL:
				"https://lh6.googleusercontent.com/-xDvfOGQV_C0/AAAAAAAAAAI/AAAAAAAAADI/OJgNEtJ94MA/photo.jpg",
			displayName: "Terry Tan",
			email: "tmy1995hflc@gmail.com"
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
				<Header className="logo" />
				<header className="Dashboard-header">
					<p className="Dashboard-title"> DashBoard </p>
					<hr className="hr-main" />
					<Button
						variant="contained"
						color="secondary"
						id="cancel"
						onClick={() => this.handleExit()}
						className={classNames(classes.signup)}
					>
						Exit / Logout
					</Button>
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
