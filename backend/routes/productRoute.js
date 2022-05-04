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
const { upload, remove } = require("../controllers/Cloundinary");

const router = express.Router();

router.route('/upload').post(upload);

router.route('/products').get(getALLProducts);

router.route('/newproduct/new').post(isAuthenticatedUser, createProduct);

// router.route('/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);

// router
// 	.route('/product/:id')
// 	.put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
// 	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)
// 	.get(getProductDetails);

router
	.route('/product/:id')
	.put(isAuthenticatedUser, updateProduct)
	.delete(isAuthenticatedUser, deleteProduct)
	.get(getProductDetails);

router.route('/products/:id').get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);


router.post("/uploadimages", isAuthenticatedUser, authorizeRoles('admin'),  upload);
router.post("/removeimage", isAuthenticatedUser, authorizeRoles('admin'), remove);

module.exports = router;
