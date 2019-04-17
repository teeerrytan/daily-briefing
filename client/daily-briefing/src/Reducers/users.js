import { login } from "../Actions/actions";

const initialState = {
	user: {
		displayName: "",
		email: "",
		photoURL: ""
	},
	auth: false
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case "LOGIN":
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}
