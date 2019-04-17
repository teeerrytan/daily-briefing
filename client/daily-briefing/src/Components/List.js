import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import MaterialIcon from "@material/react-material-icon";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import ListSubheader from "@material-ui/core/ListSubheader";
import Link from "@material-ui/core/Link";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Item from "./Item";

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
					title: "Meeting with Sundar Pichai from Google",
					subTitle: "13:00 CST / May 18, 2019",
					result: "Sundar Pichai: blabla  Google: blabla"
				},
				2: {
					title: "Meeting with Jeff Bezos from Amazon",
					subTitle: "16:00 CST / June 19, 2019",
					result: "Jeff Bezos: blabla  Amazon: blabla"
				},
				3: {
					title: "Meeting with Elon Musk from Tesla",
					subTitle: "10:00 CST / July 20, 2019",
					result: "Elon Musk: blabla  Tesla: blabla"
				},
				4: {
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
						Calendar List Items
					</ListSubheader>
				}
				className={classes.root}
			>
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
