import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./Reducers";
import * as serviceWorker from "./serviceWorker";

//public store for everything
export const store = createStore(
	reducers,
	{
		user: {
			displayName: "test",
			email: "test",
			photoURL: "test"
		}
	},
	window.devToolsExtension && window.devToolsExtension()
);

//get initial store states
console.log(store.getState());
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
