const initialState = {
	username: "",
	email: "",
	phone: "",
	currentPage: "",
	userToken: "",
	userImageURL: ""
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				username: action.username,
				email: action.email,
				phone: action.phone,
				currentPage: action.currentPage
			};
		default:
			return state;
	}
}
