import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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
import Header from "./Header";
import { changePage } from "../Actions/actions";
import { connect } from "react-redux";

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

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			warning1: false,
			warning2: false,
			warning3: false,
			warning4: false,
			username: "",
			password1: "",
			password2: ""
		};
	}

	handleSignup() {
		let username = this.state.username;
		let password1 = this.state.password1;
		let password2 = this.state.password2;
		if (username === "") {
			this.setState({ warning1: true });
		} else if (password1 === "" || password2 === "") {
			this.setState({ warning2: true });
		} else if (password1 !== password2) {
			this.setState({ warning3: true });
		} else {
			this.props.userSignup(this.state.username, this.state.password1);
			this.setState({ warning4: true });
		}
		//TODO: call Signup API, add to database and update currentPage to "Dashboard"
	}

	handleWarning1Close() {
		this.setState({ warning1: false });
	}

	handleWarning2Close() {
		this.setState({ warning2: false });
	}

	handleWarning3Close() {
		this.setState({ warning3: false });
	}

	handleWarning4Close() {
		this.setState({ warning4: false });
		this.props.dispatch(changePage("Signin"));
	}

	handleCancel() {
		this.props.dispatch(changePage("Signin"));
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

		return (
			<div className="Signup">
				<Header className="logo" />
				<header className="Signup-header">
					<p className="signup-title"> Sign Up </p>
					<TextField
						className="Standard-input"
						label="Email:"
						type="search"
						margin="normal"
						id="username"
						name="username"
						onChange={e => this.handleChange(e)}
					/>
					<TextField
						className="Standard-input"
						label="Password:"
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
				</header>

				{/* username empty warning */}
				<Dialog
					open={this.state.warning1}
					onClose={() => this.handleWarning1Close()}
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
							onClick={() => this.handleWarning1Close()}
							color="primary"
						>
							OK
						</Button>
					</DialogActions>
				</Dialog>

				{/* password empty warning */}
				<Dialog
					open={this.state.warning2}
					onClose={() => this.handleWarning2Close()}
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
							onClick={() => this.handleWarning2Close()}
							color="primary"
						>
							OK
						</Button>
					</DialogActions>
				</Dialog>

				{/* password not same warning */}
				<Dialog
					open={this.state.warning3}
					onClose={() => this.handleWarning3Close()}
				>
					<DialogTitle className={classes.dialogTitle}>
						{"Please Check Your Passwords!"}
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText className={classes.dialogText}>
							Passwords are not the same!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => this.handleWarning3Close()}
							color="primary"
						>
							OK
						</Button>
					</DialogActions>
				</Dialog>

				{/* Sign up Successful */}
				<Dialog
					open={this.state.warning4}
					onClose={() => this.handleWarning4Close()}
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
							onClick={() => this.handleWarning4Close()}
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
