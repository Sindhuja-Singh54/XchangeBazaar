const express = require('express');
const { usercreateProduct, userupdateProduct, userdeleteProduct,  } = require('../controllers/userProductController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/userproduct/new').post(isAuthenticatedUser,usercreateProduct);
router
	.route('/userproduct/:id')
	.put(isAuthenticatedUser,userupdateProduct)
    .delete(isAuthenticatedUser, userdeleteProduct);



module.exports = router;