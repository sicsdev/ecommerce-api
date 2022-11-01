const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: String,
            default: "",
        },
        role: {
            type: String,
            enum: ['User', 'Admin',],
            default: 'User'
        },
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
        },
        phone: {
            mobile: { type: String },
            countryCode: { type: String },
            callingCode: { type: Number },
        },
        alternatePhoneNo: {
            mobile: { type: String },
            countryCode: { type: String },
            callingCode: { type: Number },
        },
        stripeCustomerId: {
            type: String,
            default: "",
        },
        address: {
            type: String,
            default: ""
        },
        avatarUrl: { type: String, default: "" },
    },
    {
        timestamps: true,
    }
);

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//Match user entered password to hasheed password in database(will return T or F)
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// //Match user entered otp to hashed otp inside the database(will return T or F)
// UserSchema.methods.matchOtp = async function (enteredOtp, user) {
//     return await bcrypt.compare(enteredOtp, this.otpCode);
// };

module.exports = mongoose.model("User", UserSchema);