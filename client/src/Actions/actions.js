export function login(state) {
	return {
		type: "LOGIN",
		payload: {
			user: {
				displayName: state.user.displayName,
				email: state.user.email,
				photoURL: state.user.photoURL,
				uid: state.user.uid,
				events: state.user.events
			},
			auth: state.auth,
			currentPage: "Dashboard"
		}
	};
}

export function logout() {
	return {
		type: "LOGOUT",
		payload: {
			user: {
				displayName: "",
				email: "",
				photoURL: "",
				uid: "",
				events: []
			},
			auth: false,
			currentPage: "Signin"
		}
	};
}

export function changePage(page) {
	return {
		type: "CHANGE_PAGE",
		currentPage: page
	};
}
