import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme
} from "@material-ui/core/styles";
import "./Signup.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import blueGrey from "@material-ui/core/colors/blueGrey";
import classNames from "classnames";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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

const theme = createMuiTheme({
	palette: {
		primary: blueGrey
	},
	typography: { useNextVariants: true }
});

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiFailDialog: false,
			passwordEmptyDialog: false,
			passwordDiffDialog: false,
			successDialog: false,
			username: "",
			password1: "",
			password2: "",
			loading: false,
			response: "",
			redirectToSignin: false
		};
	}

	async handleSignup() {
		let username = this.state.username;
		let password1 = this.state.password1;
		let password2 = this.state.password2;
		if (username === "") {
			this.setState({ apiFailDialog: true });
			return;
		} else if (password1 === "" || password2 === "") {
			this.setState({ passwordEmptyDialog: true });
			return;
		} else if (password1 !== password2) {
			this.setState({ passwordDiffDialog: true });
			return;
		} else {
			this.setState({ loading: true });
			//get the response from the sign up function
			const response = await this.props.userSignup(
				this.state.username,
				this.state.password1
			);

			console.log("signin response is: " + response);
			this.setState({ response: response });
			//if not "1" which means unsuccessful login, then pop warning page and redirect back to signin page
			if (response !== "1") {
				this.setState({ apiFailDialog: true, loading: false });
			} else {
				this.setState({ successDialog: true });
			}
		}
	}

	handleapiFailDialogClose() {
		this.setState({ apiFailDialog: false });
	}

	handlepasswordEmptyDialogClose() {
		this.setState({ passwordEmptyDialog: false });
	}

	handlepasswordDiffDialogClose() {
		this.setState({ passwordDiffDialog: false });
	}

	handlesuccessDialogClose() {
		this.setState({ successDialog: false, redirectToSignin: true });
	}

	handleCancel() {
		this.setState({ redirectToSignin: true });
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		console.log("signup page states: \n", this.state);

		const { classes } = this.props;

		// var selectorStyle = {
		// 	control: base => ({
		// 		...base,
		// 		fontSize: "18px"
		// 	}),
		// 	menu: base => ({
		// 		...base,
		// 		fontSize: "14px"
		// 	})
		// };
		if (this.state.redirectToSignin) {
			return <Redirect to="/signin" />;
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
			<div className="Signup">
				<Header className="logo" />
				<header className="Signup-header">
					<p className="signup-title"> Sign Up </p>
					<MuiThemeProvider theme={theme}>
						<TextField
							className="Standard-input"
							label="Email:"
							required
							type="search"
							margin="normal"
							id="username"
							name="username"
							onChange={e => this.handleChange(e)}
						/>
						<TextField
							className="Standard-input"
							label="Password:"
							required
							type="password"
							autoComplete="current-password"
							margin="normal"
							id="password1"
							name="password1"
							onChange={e => this.handleChange(e)}
						/>
						<TextField
							className="Standard-input"
							label="Confirm Password:"
							required
							type="password"
							autoComplete="current-password"
							margin="normal"
							id="password2"
							name="password2"
							onChange={e => this.handleChange(e)}
						/>

						<Button
							variant="contained"
							color="primary"
							id="submit"
							onClick={() => this.handleSignup()}
							className={classNames(classes.signin)}
						>
							Submit
						</Button>

						<Button
							variant="contained"
							color="secondary"
							id="cancel"
							onClick={() => this.handleCancel()}
							className={classNames(classes.signup)}
						>
							Cancel
						</Button>
					</MuiThemeProvider>
				</header>

				{/* username empty warning */}
				<Dialog
					open={this.state.apiFailDialog}
					onClose={() => this.handleapiFailDialogClose()}
				>
					<DialogTitle className={classes.dialogTitle}>
						{"Credentials Error"}
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText className={classes.dialogText}>
							{this.state.response}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => this.handleapiFailDialogClose()}
							color="primary"
						>
							OK
						</Button>
					</DialogActions>
				</Dialog>

				{/* password empty warning */}
				<Dialog
					open={this.state.passwordEmptyDialog}
					onClose={() => this.handlepasswordEmptyDialogClose()}
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
								this.handlepasswordEmptyDialogClose()
							}
							color="primary"
						>
							OK
						</Button>
					</DialogActions>
				</Dialog>

				{/* password not same warning */}
				<Dialog
					open={this.state.passwordDiffDialog}
					onClose={() => this.handlepasswordDiffDialogClose()}
				>
					<DialogTitle className={classes.dialogTitle}>
						{"Credentials Error"}
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText className={classes.dialogText}>
							Passwords are not the same!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => this.handlepasswordDiffDialogClose()}
							color="primary"
						>
							OK
						</Button>
					</DialogActions>
				</Dialog>

				{/* Sign up Successful */}
				<Dialog
					open={this.state.successDialog}
					onClose={() => this.handlesuccessDialogClose()}
				>
					<DialogTitle className={classes.dialogTitle}>
						{"Success"}
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText className={classes.dialogText}>
							You have been successfully registered!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => this.handlesuccessDialogClose()}
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

Signup.propTypes = {
	classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(Signup));
