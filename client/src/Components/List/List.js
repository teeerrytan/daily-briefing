import React from "react";
import "./List.css";
import PropTypes from "prop-types";
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme
} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { connect } from "react-redux";
import Item from "../Item/Item";
import AddItem from "../AddItem/AddItem";

const styles = theme => ({
	root: {
		width: "80%",
		maxWidth: 650,
		backgroundColor: theme.palette.background.paper,
		boxShadow:
			"0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
		borderRadius: "10px"
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200
	}
});

const theme = createMuiTheme({
	palette: {
		primary: blueGrey
	},
	typography: { useNextVariants: true }
});

class FolderList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contents: [],
			open: false,
			fullWidth: true,
			maxWidth: "sm",
			category: "",
			name: "",
			company: "",
			time: "2019-05-24T10:30",
			id: Number(localStorage.getItem("curEventId"))
		};
	}

	// componentWillMount() {
	// 	let events = this.props.user.user.events;
	// }

	componentDidMount() {
		if (localStorage.getItem("events")) {
			let initial = JSON.parse(localStorage.getItem("events"));
			console.log("initial is", initial);
			for (var item of initial) {
				const tempResult = JSON.parse(item.result);
				item.result = tempResult.snippet;
				item.link = tempResult.link;
			}
			this.setState(prevState => ({
				contents: initial
			}));
		} else {
			let initial = this.props.user.user.events;
			for (var item of initial) {
				const tempResult = JSON.parse(item.result);
				item.result = tempResult.snippet;
				item.link = tempResult.link;
			}
			this.setState(prevState => ({
				contents: initial
			}));
		}
	}

	handleClick = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleAdd = async () => {
		let item = {
			id: this.state.id + 1,
			icon: "work",
			title: `Meeting with ${this.state.name} from ${this.state.company}`,
			subTitle: `${this.state.time}`.replace("T", " Time: "),
			result: `Loading...  `
		};
		await this.setState(prevState => ({
			id: prevState.id + 1,
			contents: [...prevState.contents, item],
			open: false
		}));

		localStorage.setItem("events", JSON.stringify(this.state.contents));

		let userData = {
			uid: this.props.uid,
			name: this.state.name,
			company: this.state.company,
			time: this.state.time,
			id: this.state.id
		};

		await this.props.addEvent(userData);
		return;
	};

	handleAddOpen = () => {
		this.setState({ open: true });
	};

	handleAddClose = () => {
		this.setState({ open: false });
	};

	handleSelectChange = e => {
		this.setState({ category: e.target.value });
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleDelete = async id => {
		let temp = this.state.contents;
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].id === id) {
				temp.splice(i, 1);
				break;
			}
		}
		await this.setState(prevState => ({
			contents: temp
		}));

		let userData = {
			uid: this.props.uid,
			id: id
		};

		await this.props.deleteEvent(userData);
		return;
	};

	render() {
		const { classes } = this.props;
		return (
			<List
				component="nav"
				subheader={
					<ListSubheader component="div">
						<p className="list-name">Calendar List Items</p>
					</ListSubheader>
				}
				className={classes.root}
			>
				<AddItem handleAddOpen={() => this.handleAddOpen()} />
				{/* item list */}
				{this.state.contents.map(item => (
					<Item
						key={item.id}
						id={item.id}
						content={item}
						delete={() => this.handleDelete(item.id)}
						className="item"
						link={item.link}
					/>
				))}

				<MuiThemeProvider theme={theme}>
					<Dialog
						open={this.state.open}
						onClose={this.handleAddClose}
						aria-labelledby="max-width-dialog-title"
						fullWidth={this.state.fullWidth}
						maxWidth={this.state.maxWidth}
					>
						<DialogTitle id="max-width-dialog-title">
							Add Appointment
						</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Please fill in the details of the appointment.
							</DialogContentText>
							<TextField
								id="standard-name"
								label="Name"
								className={classes.textField}
								value={this.state.name}
								onChange={this.handleChange("name")}
								margin="normal"
							/>
							<TextField
								id="standard-company"
								label="Company"
								className={classes.textField}
								value={this.state.company}
								onChange={this.handleChange("company")}
								margin="normal"
							/>
							<TextField
								id="datetime-local"
								label="Date & Time"
								type="datetime-local"
								defaultValue="2019-05-24T10:30"
								onChange={this.handleChange("time")}
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={this.handleAddClose}
								color="primary"
							>
								Cancel
							</Button>
							<Button onClick={this.handleAdd} color="primary">
								Add
							</Button>
						</DialogActions>
					</Dialog>
				</MuiThemeProvider>
			</List>
		);
	}
}
FolderList.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		user: state.user
	};
};
export default connect(mapStateToProps)(withStyles(styles)(FolderList));
