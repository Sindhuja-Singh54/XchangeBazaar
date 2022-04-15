const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const Apifeaturs = require('../utils/apifeatures');
const Userproduct = require('../models/userProductModel');

// Create Product-User
exports.usercreateProduct = catchAsyncErrors(async (req, res) => {

	req.body.user = req.user.id;
	const userProduct = await Userproduct.create(req.body);

	res.status(201).json({
		success: true,
		userProduct
	});
});

//update product - User

exports.userupdateProduct = catchAsyncErrors(async (req, res, next) => {
	let userproduct;
	userproduct = await Userproduct.findById(req.params.id);

	if (!userproduct) {
		return next(new ErrorHandler('Product not found', 404));
	}
	userproduct = await Userproduct.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	});
	res.status(200).json({
		success: true,
		userproduct
	});
});

//Delete Product
exports.userdeleteProduct = catchAsyncErrors(async (req, res, next) => {
	const userproduct = await Userproduct.findById(req.params.id);

	if (!userproduct) {
		return next(new ErrorHandler('Product not found', 404));
	}
	await userproduct.remove();

	res.status(200).json({
		success: true,
		message: 'Product Delete Successfully'
	});
});

//Get All Products
exports.getALLUserProducts = catchAsyncErrors(async (req, res, next) => {
	const resultPerPage = 8;
	const userproductsCount = await Userproduct.countDocuments();

	const apifeaturs = new Apifeaturs(Userproduct.find({}), req.query).search().filter().pagination(resultPerPage);
	const userproduct = await apifeaturs.query;
	
	res.status(200).json({
		success: true,
		userproduct,
		userproductsCount,
		resultPerPage,
	});
});
