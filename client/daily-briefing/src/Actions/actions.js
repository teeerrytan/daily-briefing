export function login(newUser) {
	return {
		type: "LOGIN",
		payload: {
			user: {
				displayName: newUser.displayName,
				email: newUser.email,
				photoURL: newUser.photoURL
			},
			auth: true
		}
	};
}
