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
					<Avatar>
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
							style={{}}
							onClick={() => this.props.delete()}
						>
							<MaterialIcon icon="delete" />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<MaterialIcon icon="star" />
							</ListItemIcon>
							<ListItemText
								inset
								primary={this.state.content.result}
							/>
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
