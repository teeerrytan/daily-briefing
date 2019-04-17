import React, { Component } from "react";
import "./Header.css";
import ButtonBase from "@material-ui/core/ButtonBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { connect } from "react-redux";
import { logout } from "../Actions/actions";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				photoURL: this.props.user.user.photoURL,
				displayName: this.props.user.user.displayName,
				email: this.props.user.user.email
			},
			anchorEl: null,
			auth: this.props.user.auth
		};
	}

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleExit = () => {
		this.props.dispatch(logout());
		this.setState({ anchorEl: null });
	};
	render() {
		console.log("header page states: \n", this.state);
		const { auth, anchorEl } = this.state;
		const open = Boolean(anchorEl);
		return (
			<div className="header">
				<div className="grid-item" />
				<h2 className="title">Daily Briefing</h2>
				{auth && (
					<div>
						<ButtonBase
							focusRipple
							key={"avatar"}
							onClick={this.handleMenu}
							className="avatar"
						>
							<img
								src={this.state.user.photoURL}
								style={{
									width: "60px",
									borderRadius: "50%"
								}}
								alt=""
								className="avatar-img"
							/>
						</ButtonBase>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							open={open}
							onClose={this.handleClose}
						>
							<MenuItem onClick={this.handleClose}>
								{this.state.user.displayName}
							</MenuItem>
							<MenuItem onClick={this.handleClose}>
								{this.state.user.email}
							</MenuItem>
							<MenuItem onClick={this.handleExit}>
								Log out
							</MenuItem>
						</Menu>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
		auth: state.auth
	};
};

export default connect(mapStateToProps)(Header);
