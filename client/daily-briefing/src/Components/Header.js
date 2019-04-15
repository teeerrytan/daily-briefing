import React, { Component } from "react";
import "./Header.css";
import ButtonBase from "@material-ui/core/ButtonBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photoURL:
				"https://lh6.googleusercontent.com/-xDvfOGQV_C0/AAAAAAAAAAI/AAAAAAAAADI/OJgNEtJ94MA/photo.jpg",
			displayName: "Terry Tan",
			email: "tmy1995hflc@gmail.com",
			anchorEl: null,
			auth: true
		};
	}

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};
	render() {
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
								src={this.state.photoURL}
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
								{this.state.email}
							</MenuItem>
							<MenuItem onClick={this.handleClose}>
								Log out
							</MenuItem>
						</Menu>
					</div>
				)}
			</div>
		);
	}
}
