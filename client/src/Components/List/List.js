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
			id: 5
		};
	}

	componentDidMount() {
		this.setState({
			contents: [
				{
					id: 1,
					icon: "work",
					title: "Meeting with Sundar Pichai from Google",
					subTitle: "13:00 CST / May 18, 2019",
					result: "Sundar Pichai: blabla  Google: blabla"
				},
				{
					id: 2,
					icon: "work",
					title: "Meeting with Jeff Bezos from Amazon",
					subTitle: "16:00 CST / June 19, 2019",
					result: "Jeff Bezos: blabla  Amazon: blabla"
				},
				{
					id: 3,
					icon: "work",
					title: "Meeting with Elon Musk from Tesla",
					subTitle: "10:00 CST / July 20, 2019",
					result: "Elon Musk: blabla  Tesla: blabla"
				},
				{
					id: 4,
					icon: "work",
					title: "Meeting with Jimmy Kimmel from ABC",
					subTitle: "15:00 CST / July 12, 2019",
					result: "Jimmy Kimmel: blabla  ABC: blabla"
				}
			]
		});
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
			result: `${this.state.name}: blabla  ${this.state.company}: blabla`
		};
		this.setState(prevState => ({
			id: prevState.id + 1,
			contents: [...prevState.contents, item],
			open: false
		}));

		let userData = {
			uid: this.props.uid,
			name: this.state.name,
			company: this.state.company,
			time: this.state.time
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

	handleDelete = id => {
		let temp = this.state.contents;
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].id === id) {
				temp.splice(i, 1);
				break;
			}
		}
		this.setState(prevState => ({
			contents: temp
		}));
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
							{/* <FormControl className={classes.formControl}>
								<InputLabel shrink htmlFor="category">
									Category
								</InputLabel>
								<Select
									value={this.state.category}
									onChange={this.handleSelectChange}
									input={
										<Input name="category" id="category" />
									}
									displayEmpty
									name="category"
									className={classes.selectEmpty}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem value={"supervisor_account"}>
										Family
									</MenuItem>
									<MenuItem value={"work"}>Work</MenuItem>
									<MenuItem value={"local_activity"}>
										Other
									</MenuItem>
								</Select>
							</FormControl> */}
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

export default withStyles(styles)(FolderList);
