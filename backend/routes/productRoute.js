const express = require('express');
const {
	getALLProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductDetails,
	createProductReview,
	getProductReviews,
	deleteReview,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/products').get(getALLProducts);

router.route('/product/new').post(isAuthenticatedUser, createProduct);

router
	.route('/product/:id')
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)
	.get(getProductDetails);

router.route('/products/:id').get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
