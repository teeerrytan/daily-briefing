const initialState = {
	user: {
		displayName: "",
		email: "",
		photoURL: "",
		uid: ""
	},
	auth: false,
	currentPage: "Signin"
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case "LOGIN":
			return Object.assign({}, state, action.payload);
		case "LOGOUT":
			return Object.assign({}, state, action.payload);
		case "CHANGE_PAGE":
			return Object.assign({}, state, {
				currentPage: action.currentPage
			});
		default:
			return state;
	}
}
