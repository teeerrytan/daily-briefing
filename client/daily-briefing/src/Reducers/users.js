import { login } from "../Actions/actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case "LOGIN":
			return action.payload;
		default:
			return state;
	}
}
