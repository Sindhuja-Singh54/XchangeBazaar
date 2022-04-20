import React, { Fragment, useState, useEffect } from 'react';
import './Sell.css';
import Loader from '../layout/loader/Loader';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../layout/Header/MetaData';
import {createProduct, clearErrors} from "../../actions/ProductActon"
import SellSharpIcon from '@mui/icons-material/SellSharp';
import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';
import ImageSharpIcon from '@mui/icons-material/ImageSharp';


const categories = [ 'Laptop', 'Footwear', 'Bottom', 'Tops', 'Attire', 'Camera', 'SmartPhones' ];

const Sell = ({history, location}) => {

	const dispatch = useDispatch(); 
	const alert = useAlert();

	const { loading, isAuthenticated, error } = useSelector((state) => state.createproduct);
	
	const [ product , setProduct ] = useState({
		name: '',
		// number: '',
		price: '',
		Stock:'',
		description:'',
		category:''
	});

	const { name, price,Stock,description,category } = product;

	const [ images, setImages] = useState(
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQswyS9t5Kk8qLSukr6FqtJlyGgQ8N22WoxZQ&usqp=CAU'
	);
	const [ imagesPreview, setImagesPreview ] = useState(
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQswyS9t5Kk8qLSukr6FqtJlyGgQ8N22WoxZQ&usqp=CAU'
	); 

	const createProductSubmit = (e) => {

		e.preventDefault();
	
		const myProduct = new FormData();
	
		myProduct.set("name", name);
		// myProduct.set("number", number);
		myProduct.set("price", price);
		myProduct.set("Stock", Stock);
		myProduct.set("description", description);
		myProduct.set("category", category);
		myProduct.set("images", images);
		console.log("sign up form submitted");
		dispatch(createProduct(myProduct));
	  };
 
	  const registerDataChange = (e) => {
		if (e.target.name === 'images') {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview(reader.result);
					imagesPreview(reader.result);
				}
			};

			reader.readAsDataURL(e.target.files[0]);
		} else {
			setProduct({ ...product, [e.target.name]: e.target.value });
		}
	};



	const redirect = location.search ? location.search.split("=")[1] : "/account";

	useEffect(() => {
	  if (error) {
		alert.error(error);
		dispatch(clearErrors());
	  }
  
	  if (isAuthenticated) {
		history.push(redirect);
	  }
	}, [dispatch, error, alert, history, isAuthenticated, redirect]);

	
	return ( 
		<Fragment>
		  {loading ? (
		    <Loader />
		  ) : (
		<Fragment>
			<MetaData title="Update Profile" />
			<div className="SellContainer">
				<div className="updateProfileBox">
					<h2 className="updateProfileHeading">Sell</h2>
					<div className="SellForm" >
					<img  className="SellImage" src={imagesPreview} alt="images Preview" />
					<form
						className="updateProfileForm"
						encType="multipart/form-data"
						onSubmit={createProductSubmit}
					>
						<div className="updateProfileName">
							<SellSharpIcon />
							<input
								type="text"
								placeholder="Product Name"
								required
								name="name"
								value={name}
								onChange={registerDataChange}							
								/>
						</div>
						{/* <div className="updateProfileEmail">
							<MailOutlineIcon />
							<input
								type="Number"
								placeholder="Phone Number"
								required
								name="number"
								value={number}
								onChange={registerDataChange}	
							/>
						</div> */}
						<div className="updateProfileEmail">
							<CurrencyRupeeSharpIcon/>
							<input
								type="text"
								maxLength={4}
								placeholder="Price"
								required
								name="price"
								value={price}
								onChange={registerDataChange}	
							/>
						</div>
						<div className="updateProfileEmail">
							<input
								type="Number"
								maxLength={4}
								placeholder="Stock"
								required
								name="Stock"
								value={Stock}
								onChange={registerDataChange}	
							/>
						</div>
						<div className="updateProfileEmail">
							<input
								type="text"
								maxLength={50}
								placeholder="Description"
								required
								name="description"
								value={description}
								onChange={registerDataChange}	
							/>
						</div>
						<div className="updateProfileEmail">
							<label for="category">Choose a Category:</label>
						</div>
						<div className="updateProfileEmail">
							<select id="category" name="category" onClick={registerDataChange}>
								<option value="trunk">Trunk</option>
								<option value="lab_coat">Lab coat</option>
								<option value="book">Book</option>
								<option value="fan">Fan</option>
								<option value="laptop">Laptop</option>
								<option value="footwear">Footwear</option>
								<option value="smartPhones">SmartPhones</option>
								<option value="attire">Attire</option>
								<option value="attire">Other</option>
							</select>
						</div>
{/* 
						<div id="updateProfileImage">
							<img src={avatarPreview} alt="Avatar Preview" />
							<input
								type="file"
								name="images"
								accept="image/*"
								onChange={registerDataChange}
							/>
						</div> */}
						<div id="registerImage">
							<input type="file" name="images" accept="image/*" onChange={registerDataChange} />
						</div>
					</form>
					</div>
					<input type="submit" value="createProduct" className="updateProfileBtn" />
				</div>
			</div>
		</Fragment>
		  )}
		</Fragment>
	);
};

export default Sell;
