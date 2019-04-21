import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const styles = theme => ({
	signin: {
		color: theme.palette.getContrastText(blueGrey[600]),
		backgroundColor: blueGrey[700],
		"&:hover": {
			backgroundColor: blueGrey[900]
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
			password: "",
			loading: false,
			redirect: false,
			response: "",
			redirectToSignup: false
		};
	}

	handleUsernameEmptyWarningClose() {
		this.setState({ usernameEmptyWarning: false });
	}

	handlePasswordEmptyWarningClose() {
		this.setState({ passwordEmptyWarning: false });
	}

	handleUserNotFoundWarningClose() {
		this.setState({ userNotFoundWarning: false, loading: false });
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
		//get input func
		// const node = findDOMNode(this.refs.input);
		// const text = node.value.trim();
		// this.props.onAddClick(text);
		// node.value = "";
	};

	handleSignup() {
		this.setState({ redirectToSignup: true });
	}

	async handleSignin() {
		if (this.state.username === "") {
			this.setState({ usernameEmptyWarning: true });
			return this.state.usernameEmptyWarning;
		} else if (this.state.password === "") {
			this.setState({ passwordEmptyWarning: true });
			return this.state.passwordEmptyWarning;
		} else {
			this.setState({ loading: true });

			//get the response from the emailLogin function
			const response = await this.props.userEmailLogin(
				this.state.username,
				this.state.password
			);
			console.log("signin response is: " + response);
			this.setState({ response: response });
			//if not "1" which means unsuccessful login, then pop warning page and redirect back to signin page
			if (response !== "1") {
				this.setState({ userNotFoundWarning: true, loading: false });
			} else {
				this.setState({ redirect: true });
			}
		}
	}

	async GoogleLogin() {
		const res = await this.props.signInWithGoogle();
		console.log("res is: " + res);
		if (res) {
			this.setState({
				redirect: true
			});
		}
	}

	render() {
		const { classes } = this.props;
		console.log("signin page states: \n", this.state);
		if (this.state.redirect) {
			return <Redirect to="/dashboard" />;
		}
		if (this.state.redirectToSignup) {
			return <Redirect to="/signup" />;
		}
		if (this.state.loading) {
			return (
				<div className="loading" style={{ textAlign: "center" }}>
					<Header className="logo" />
					<div style={{ height: "200px" }} />
					<div className="sk-cube-grid">
						<div className="sk-cube sk-cube1" />
						<div className="sk-cube sk-cube2" />
						<div className="sk-cube sk-cube3" />
						<div className="sk-cube sk-cube4" />
						<div className="sk-cube sk-cube5" />
						<div className="sk-cube sk-cube6" />
						<div className="sk-cube sk-cube7" />
						<div className="sk-cube sk-cube8" />
						<div className="sk-cube sk-cube9" />
					</div>
					<div className="contentMainHeader">Loading...</div>
				</div>
			);
		}
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
						required
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
							required
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
						onClick={() => this.GoogleLogin()}
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
						{"Credentials Error"}
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
						{"Credentials Error"}
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
						{"Credentials Incorrect!"}
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText className={classes.dialogText}>
							{this.state.response}
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

export default connect()(withStyles(styles)(Signin));
