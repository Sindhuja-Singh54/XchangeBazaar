const Product = require('../models/productmodels');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const Apifeaturs = require('../utils/apifeatures');
const cloudinary = require('cloudinary');

// Create Product-Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
	const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
		folder: 'images',
		width: 150,
		crop: 'scale'
	});

	const { name, price, Stock, description, category } = req.body;
	const product = await Product.create({
		name,
		price,
		Stock,
		description,
		category,
		images: {
			public_id: myCloud.public_id,
			url: myCloud.secure_url
		}
	});
	res.status(201).json({
		success: true,
		product
	});
});

// exports.createProduct = catchAsyncErrors(async (req, res, next) => {

// 	req.body.user = req.user.id;
// 	const product = await Product.create(req.body);

// 	res.status(201).json({
// 		success: true,
// 		product
// 	});
// });

//Get All Products
exports.getALLProducts = catchAsyncErrors(async (req, res, next) => {
	const resultPerPage = 8;
	const productsCount = await Product.countDocuments();

	const apifeaturs = new Apifeaturs(Product.find({}), req.query).search().filter().pagination(resultPerPage);
	const products = await apifeaturs.query;

	res.status(200).json({
		success: true,
		products,
		productsCount,
		resultPerPage
	});
});

//update product - admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
	let product;
	product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}
	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	});
	res.status(200).json({
		success: true,
		product
	});
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}

	res.status(200).json({
		success: true,
		product
	});
});

//Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}
	await product.remove();

	res.status(200).json({
		success: true,
		message: 'Product Delete Successfully'
	});
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
	const { rating, comment, productId } = req.body;

	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment
	};

	const product = await Product.findById(productId);

	const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

	if (isReviewed) {
		product.reviews.forEach((rev) => {
			if (rev.user.toString() === req.user._id.toString()) (rev.rating = rating), (rev.comment = comment);
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}

	let avg = 0;

	product.reviews.forEach((rev) => {
		avg += rev.rating;
	});

	product.ratings = avg / product.reviews.length;

	await product.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true
	});
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.query.id);

	if (!product) {
		return next(new ErrorHander('Product not found', 404));
	}

	res.status(200).json({
		success: true,
		reviews: product.reviews
	});
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.query.productId);

	if (!product) {
		return next(new ErrorHander('Product not found', 404));
	}

	const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

	let avg = 0;

	reviews.forEach((rev) => {
		avg += rev.rating;
	});

	let ratings = 0;

	if (reviews.length === 0) {
		ratings = 0;
	} else {
		ratings = avg / reviews.length;
	}

	const numOfReviews = reviews.length;

	await Product.findByIdAndUpdate(
		req.query.productId,
		{
			reviews,
			ratings,
			numOfReviews
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false
		}
	);

	res.status(200).json({
		success: true
	});
});
