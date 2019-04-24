import React, { Component } from "react";
import "./NotFound.css";

export default class NotFound extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: "http://i.giphy.com/l117HrgEinjIA.gif"
		};
	}
	render() {
		return (
			<div className="FourOhFour">
				<div
					className="bg"
					style={{ backgroundImage: "url(" + this.state.image + ")" }}
				/>
				<div className="code">
					404, <br />
					Page Not Found
				</div>
			</div>
		);
	}
}
