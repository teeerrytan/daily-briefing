import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import "./Signin.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usernameEmptyWarning: false,
			passwordEmptyWarning: false,
			userNotFoundWarning: false,
			username: "",
			password: ""
		};
	}

	handleUsernameEmptyWarningClose() {
		this.setState({ usernameEmptyWarning: false });
	}

	handlePasswordEmptyWarningClose() {
		this.setState({ passwordEmptyWarning: false });
	}

	handleUserNotFoundWarningClose() {
		this.setState({ userNotFoundWarning: false });
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSignup() {
		this.props.changePage("Signup");
	}

	handleSignin() {
		this.props.changePage("Loading");
		this.props.userEmailLogin(this.state.username, this.state.password);
	}

	render() {
		const { classes } = this.props;
		console.log("signin page states: \n", this.state);
		return (
			<div className="Signin">
				<Header className="logo" />
				<header className="Signin-header">
					<p className="signin-title"> Sign In </p>
					<TextField
						className="Standard-input"
						label="Email:"
						type="search"
						margin="normal"
						id="username"
						style={{
							width: "300px"
						}}
						name="username"
						onChange={e => this.handleChange(e)}
					/>
					<div className="Password">
						<TextField
							className="Standard-input"
							label="Password:"
							type="password"
							autoComplete="current-password"
							margin="normal"
							id="password"
							style={{
								width: "300px"
							}}
							name="password"
							onChange={e => this.handleChange(e)}
						/>
						{/* <p>Forgot Password</p> */}
					</div>
					<Button
						variant="contained"
						color="primary"
						className={classNames(classes.signin)}
						id="sign-in"
						onClick={() => this.handleSignin()}
					>
						Sign in
					</Button>
					<div id="sign-up-div">
						<p id="sign-up-p">Or sign in with Google&trade;</p>
					</div>
					<Button
						variant="contained"
						color="primary"
						className={classNames(classes.signin)}
						id="sign-in"
						onClick={() => this.props.userGoogleLogin()}
					>
						Sign in with Google
					</Button>
					<div id="sign-up-div">
						<p id="sign-up-p">Don't have an account yet?</p>
					</div>
					<div>
						<Button
							variant="contained"
							color="secondary"
							id="sign-up"
							className={classNames(classes.signup)}
							onClick={() => this.handleSignup()}
						>
							Sign up
						</Button>
					</div>
				</header>

				{/* username empty warning */}
				<Dialog
					open={this.state.usernameEmptyWarning}
					onClose={() => this.handleUsernameEmptyWarningClose()}
				>
					<DialogTitle className={classes.dialogTitle}>
						{"Please Check Your Username!"}
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText className={classes.dialogText}>
							Username cannot be empty!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() =>
								this.handleUsernameEmptyWarningClose()
							}
							color="primary"
						>
							OK
						</Button>
					</DialogActions>
				</Dialog>

				{/* password empty warning */}
				<Dialog
					open={this.state.passwordEmptyWarning}
					onClose={() => this.handlePasswordEmptyWarningClose()}
				>
					<DialogTitle className={classes.dialogTitle}>
						{"Please Check Your Password!"}
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText className={classes.dialogText}>
							Password cannot be empty!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() =>
								this.handlePasswordEmptyWarningClose()
							}
							color="primary"
						>
							OK
						</Button>
					</DialogActions>
				</Dialog>

				{/* user not found warning */}
				<Dialog
					open={this.state.userNotFoundWarning}
					onClose={() => this.handleUserNotFoundWarningClose()}
				>
					<DialogTitle className={classes.dialogTitle}>
						{"User Not Found!"}
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText className={classes.dialogText}>
							The attempted login request has been denied.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() =>
								this.handleUserNotFoundWarningClose()
							}
							color="primary"
						>
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

Signin.propTypes = {
	classes: PropTypes.object.isRequired
};

export default connect(
	null,
	mapDispatchToProps
)(withStyles(styles)(Signin));
