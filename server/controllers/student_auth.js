const { StatusCodes } = require("http-status-codes")
const Student = require("../model/Student")

const register = async (req, res) => {
	const student = await Student.create({ ...req.body })
	const token = Student.createJWT()
	res.status(StatusCodes.CREATED).json({ name: student.name })
}

const login = async (req, res) => {
	const { email, password } = req.body

	const student = await Student.findOne({ email: email })

	if (!student) {
		throw new UnauthenticatedError("Email does not exist")
	}

	const isPasswordCorrect = await Student.comparePassword(password)
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid password")
	}

	const token = Student.createJWT()
	res.status(StatusCodes.OK).json({ name: student.name })
}

module.exports = { register, login }
