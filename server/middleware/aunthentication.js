const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (authHeader === "Bearer NULL")
		next(new UnauthenticatedError("Authentication Invalid"))

	const token = authHeader.split(" ")[1]
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)
		req.user = { userId: payload.userId, name: payload.name }
		next()
	} catch (error) {
		next(new UnauthenticatedError("Authentication failed"))
	}
}

module.exports = auth
