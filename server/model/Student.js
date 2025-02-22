const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const StudentSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		enum: ["M", "F", "Prefer not to say"],
		default: "Prefer not to say",
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	class: {
		type: Number,
		enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		required: true,
	},
	section: {
		type: String,
		enum: ["A", "B", "C", "D"],
		required: true,
	},
	roll: {
		type: Number,
		max: 50,
	},
	hobby: {
		type: String,
		default: "Prefer not to say",
	},
	scienceMarks: {
		type: Number,
		default: 0,
		min: 0,
		max: 100,
	},
	mathsMarks: {
		type: Number,
		default: 0,
		min: 0,
		max: 100,
	},
	computerMarks: {
		type: Number,
		default: 0,
		min: 0,
		max: 100,
	},
})

StudentSchema.pre("save", async function () {
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

StudentSchema.methods.createJWT = () => {
	const token = jwt.sign(
		{ userId: this._id, name: this.name },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	)
	return token
}

StudentSchema.methods.comparePassword = async (enteredPassword) => {
	const isMatch = await bcrypt.compare(enteredPassword, this.password)
	return isMatch
}

module.exports = mongoose.model("Student", StudentSchema)
