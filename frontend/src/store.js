import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createproductReducer, productDetailsReducer, productsReducer } from './reducers/ProductReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/UserReducer';
import { cartReducer } from './reducers/CardReducer';
import { newOrderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    products : productsReducer,
    productDetails: productDetailsReducer,
    createproduct :createproductReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer
});

let initialState = {
    cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [ thunk ];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;
 





























