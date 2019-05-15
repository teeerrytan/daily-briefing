import React from "react";
import "./Item.css";
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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const styles = theme => ({
	nested: {
		paddingLeft: theme.spacing.unit * 4
	},
	avatar: {
		color: "#fff",
		background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
	},
	delete: {
		color: "#b80000"
	}
});

class FolderList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			content: this.props.content
		};
	}

	handleClick = () => {
		this.setState(state => ({ open: !state.open }));
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<ListItem button onClick={this.handleClick}>
					<Avatar className={classes.avatar}>
						<MaterialIcon icon={this.state.content.icon} />
					</Avatar>
					<ListItemText
						primary={this.state.content.title}
						secondary={this.state.content.subTitle}
					/>
					{this.state.open ? (
						<MaterialIcon icon="keyboard_arrow_up" />
					) : (
						<MaterialIcon icon="keyboard_arrow_down" />
					)}
					<ListItemSecondaryAction className="delete-button">
						<IconButton
							aria-label="Delete"
							className={classes.delete}
							onClick={() => this.props.delete()}
						>
							<MaterialIcon icon="delete" />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>

				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem className={classes.nested}>
							<ListItemIcon>
								<MaterialIcon icon="star" />
							</ListItemIcon>
							<a href={this.state.content.link} target="_blank">
								<ListItemText
									inset
									primary={this.state.content.result}
									secondary={this.state.content.link}
								/>
							</a>
						</ListItem>
					</List>
				</Collapse>

				<Divider />
			</div>
		);
	}
}
FolderList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FolderList);
