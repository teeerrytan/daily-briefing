import React, { Component } from "react";
import Header from "./Header";

class Loading extends Component {
	render() {
		return (
			<div className="loading" style={{ textAlign: "center" }}>
				<Header className="logo" />
				<div style={{ height: "200px" }} />
				<div className="sk-cube-grid">
					<div className="sk-cube sk-cube1" />
					<div className="sk-cube sk-cube2" />
					<div className="sk-cube sk-cube3" />
					<div className="sk-cube sk-cube4" />
					<div className="sk-cube sk-cube5" />
					<div className="sk-cube sk-cube6" />
					<div className="sk-cube sk-cube7" />
					<div className="sk-cube sk-cube8" />
					<div className="sk-cube sk-cube9" />
				</div>
				<div className="contentMainHeader">Loading...</div>
			</div>
		);
	}
}

export default Loading;
