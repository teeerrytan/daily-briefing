import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
	root: {
		width: "100%",
		maxWidth: 800,
		backgroundColor: theme.palette.background.paper
	}
});

class FolderList extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<List className={classes.root}>
				<ListItem>
					<Avatar />
					<ListItemText
						primary="Meeting with Larry Page from Google"
						secondary="13:00 CST / June 9, 2019"
					/>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText
						primary="Meeting with Jeff Bezos from Amazon"
						secondary="16:00 CST / May 8, 2019"
					/>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText
						primary="Meeting with Elon Musk from Tesla"
						secondary="10:00 CST / July 20, 2014"
					/>
				</ListItem>
			</List>
		);
	}
}
FolderList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FolderList);
