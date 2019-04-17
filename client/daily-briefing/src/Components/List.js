import React from "react";
import "./List.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
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
	}
});

class FolderList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contents: {
				1: {
					icon: "work",
					title: "Meeting with Sundar Pichai from Google",
					subTitle: "13:00 CST / May 18, 2019",
					result: "Sundar Pichai: blabla  Google: blabla"
				},
				2: {
					icon: "work",
					title: "Meeting with Jeff Bezos from Amazon",
					subTitle: "16:00 CST / June 19, 2019",
					result: "Jeff Bezos: blabla  Amazon: blabla"
				},
				3: {
					icon: "work",
					title: "Meeting with Elon Musk from Tesla",
					subTitle: "10:00 CST / July 20, 2019",
					result: "Elon Musk: blabla  Tesla: blabla"
				},
				4: {
					icon: "work",
					title: "Meeting with Jimmy Kimmel from ABC",
					subTitle: "15:00 CST / July 12, 2019",
					result: "Jimmy Kimmel: blabla  ABC: blabla"
				}
			}
		};
	}

	handleClick = () => {
		this.setState(state => ({ open: !state.open }));
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
				<AddItem />
				<Item content={this.state.contents[1]} />
				<Item content={this.state.contents[2]} />
				<Item content={this.state.contents[3]} />
				<Item content={this.state.contents[4]} />
			</List>
		);
	}
}
FolderList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FolderList);
