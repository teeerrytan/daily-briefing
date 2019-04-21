import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./Reducers/index";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

//public store for everything
export const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//listen to store
store.subscribe(() => {
	console.log(store.getState());
});
//test redux
// const payload = {
// 	user: {
// 		displayName: "terry",
// 		email: "terrytan@terrytan.dev",
// 		photoURL: "./static/avatar.jpg"
// 	},
// 	auth: true
// };
// store.dispatch(login(payload));
render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
