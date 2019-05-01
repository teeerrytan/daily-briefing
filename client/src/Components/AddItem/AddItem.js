import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import MaterialIcon from "@material/react-material-icon";
import pink from "@material-ui/core/colors/pink";
import "./AddItem.css";

const styles = theme => ({
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},
	pinkAvatar: {
		color: "#fff",
		background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"
	}
});

class FolderList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icon: "playlist_add",
			title: "Add another appointment",
			subTitle: "Date & Time"
		};
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<ListItem button onClick={() => this.props.handleAddOpen()}>
					<Avatar className={classes.pinkAvatar}>
						<MaterialIcon icon={this.state.icon} />
					</Avatar>
					<ListItemText
						primary={this.state.title}
						secondary={this.state.subTitle}
					/>
				</ListItem>
				<Divider />
			</div>
		);
	}
}
FolderList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FolderList);
