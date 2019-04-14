export const login = profile => ({
	type: "LOGIN",

	email: profile.email,
	phone: profile.phone,
	username: profile.username
});
