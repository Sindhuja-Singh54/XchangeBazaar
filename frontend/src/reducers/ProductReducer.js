import {
	ALL_PRODUCT_FAIL,
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	CREATE_PRODUCT_DETAILS_REQUEST,
	CREATE_PRODUCT_DETAILS_SUCCESS,
	CREATE_PRODUCT_DETAILS_FAIL,
	CREATE_PRODUCT_DETAILS_RESET,
	CLEAR_ERRORS
} from '../constants/ProductConstants';

export const productsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case ALL_PRODUCT_REQUEST:
			return {
				loading: true,
				products: []
			};
		case ALL_PRODUCT_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
				productsCount: action.payload.productsCount,
				resultPerPage: action.payload.resultPerPage,
				filteredProductsCount: action.payload.filteredProductsCount
			};
		case ALL_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};

export const productDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				...state
			};
		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload
			};
		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};

export const createproductReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case CREATE_PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				product:false
			};
		case CREATE_PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				...state,
				product: action.payload,
				// success:true
			};
		case CREATE_PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
				product:false
			};
		case CREATE_PRODUCT_DETAILS_RESET:
			//   case UPDATE_USER_RESET:
			return {
				...state,
				loading: true,
				error: null,
				product:false
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};
