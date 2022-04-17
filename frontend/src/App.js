import './App.css';
import Header from './component/layout/Header/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useState, useEffect } from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/UserAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgetPassword from './component/User/ForgetPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Sell from './component/Sell/Sell';

function App() {
	const { isAuthenticated, user } = useSelector((state) => state.user);

	const [ stripeApiKey, setStripeApiKey ] = useState('');

	async function getStripeApiKey() {
		const { data } = await axios.get('/api/v1/stripeapikey');

		setStripeApiKey(data.stripeApiKey);
	}

	useEffect(() => {
		WebFont.load({
			google: {
				families: [ 'Roboto', 'Droid Sans', 'Chilanka' ]
			}
		});
		store.dispatch(loadUser());
	  getStripeApiKey();
	}, []);

	return (
		<Router>
			<Header />
			{isAuthenticated && <UserOptions user={user} />}
			<Route exact path="/" component={Home} />
			<Route exact path="/product/:id" component={ProductDetails} />
			<Route exact path="/products" component={Products} />
			<Route path="/products/:keyword" component={Products} />
			<Route exact path="/Search" component={Search} />
			<ProtectedRoute exact path="/account" component={Profile} />
			<Route exact path="/login" component={LoginSignUp} />
			<Route exact path="/Cart" component={Cart} /> 
			<ProtectedRoute exact path="/me/update" component={UpdateProfile} />
			<ProtectedRoute exact path="/password/update" component={UpdatePassword} />
			<Route exact path="/password/forgot" component={ForgetPassword} />
			<Route exact path="/password/reset/:token" component={ResetPassword} />
			<ProtectedRoute exact path="/shipping" component={Shipping} />
			<ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
			{stripeApiKey && (
				<Elements stripe={loadStripe(stripeApiKey)}>
					<ProtectedRoute exact path="/process/payment" component={Payment} />
				</Elements>
			)}
			<ProtectedRoute exact path="/newproduct/new" component={Sell} />
			<Footer />
		</Router>
	);
}

export default App;
