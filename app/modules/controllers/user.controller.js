const { msg } = require("../../../config/message");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../helper/errorResponse");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");
const phone = require("phone");
const { googleAuth, googleReports } = require("../../helper/googleAds");
const { facebookAuth, getFacebookReports } = require("../../helper/facebookAds");
const urlParse = require("url-parse");
const queryParse = require("query-string");

// @desc    Google SignIn Render
// @route   POST/api/v1/user/signin
// access    Public
exports.authGoogle = asyncHandler(async (req, res, next) => {
    let data = await googleAuth();

    console.log("Data : : ", data);
    res.status(200).json({
        data: data
    })
})

exports.getGoogleReports = asyncHandler(async (req, res, next) => {
    const queryUrl = new urlParse(req.url);
    const code = queryParse.parse(queryUrl.query).code;

    let data = await googleReports(code);
    console.log("Code : ", code);

    res.status(200).json({
        success: true,
        data: code
    })
})

// @desc    Google SignIn Render
// @route   POST/api/v1/user/signin
// access    Public
exports.authFacebook = asyncHandler(async (req, res, next) => {
    let data = await facebookAuth();

    res.status(200).json({
        success: true,
        data: data
    })
})

// @desc    Facebook Reports
// @route   POST/api/v1/user/signin
// access    Public
exports.getFacebookReports = asyncHandler(async (req, res, next) => {
    const queryUrl = new urlParse(req.url);
    let code = queryParse.parse(queryUrl.query).code;

    let data = await getFacebookReports(code);
    res.status(200).json({
        success: true,
        data: data,
    })
})

// @desc    Register User
// @route   POST/api/v1/user/register
// access    Public
exports.postregister = asyncHandler(async (req, res, next) => {
    let { email } = req.body;

    let email1 = validator.validate(email);
    if (!email1) {
        return next(new ErrorResponse(msg.invalidEmail, 409));
    }

    let user = await User.findOne({ email: email });
    let token;
    if (!user) {
        user = await User.create({
            email: email,
        });
        token = user.getSignedJwtToken();

        user = JSON.stringify(user);
        user = JSON.parse(user);
        user.isRegistered = true;
    }
    else {
        token = user.getSignedJwtToken();

        user = JSON.stringify(user);
        user = JSON.parse(user);
        user.isRegistered = false;
    }

    res.status(200).json({
        success: true,
        data: user,
        token,
    });
});

// @desc    Edit User Details
// @route   POST/api/v1/user/edit
// access    Public
exports.editUser = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorResponse(msg.userNotFound, 409));
    }

    let payload = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address
    }

    user = await User.findByIdAndUpdate(user._id, payload, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        data: user,
    });
})

exports.getGoogleAdsReports = asyncHandler(async (req, res, next) => {

})