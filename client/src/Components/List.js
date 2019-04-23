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
import Item from "./Item";
import AddItem from "./AddItem";

const styles = theme => ({
	root: {
		width: "90%",
		maxWidth: 800,
		backgroundColor: theme.palette.background.paper
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
			maxWidth: "md"
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

	handleAdd = () => {};

	handleAddOpen = () => {
		this.setState({ open: true });
	};

	handleAddClose = () => {
		this.setState({ open: false });
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
				{this.state.contents.map(item => (
					<Item key={item.id} content={item} />
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
								autoFocus
								margin="dense"
								id="name"
								label="Appointment Content"
								fullWidth
								variant="filled"
							/>
							<TextField
								id="datetime-local"
								label="Date & Time"
								type="datetime-local"
								defaultValue="2019-05-24T10:30"
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

export default withStyles(styles)(FolderList);
