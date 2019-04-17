export function login(state) {
	return {
		type: "LOGIN",
		payload: {
			user: {
				displayName: state.user.displayName,
				email: state.user.email,
				photoURL: state.user.photoURL
			},
			auth: state.auth
		}
	};
}
