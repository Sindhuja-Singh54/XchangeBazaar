import React, { Fragment, useState, useEffect } from 'react';
import './Sell.css';
import Loader from '../layout/loader/Loader';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../layout/Header/MetaData';
import {createProduct, clearErrors} from "../../actions/ProductActon"


const categories = [ 'Laptop', 'Footwear', 'Bottom', 'Tops', 'Attire', 'Camera', 'SmartPhones' ];

const Sell = ({history}) => {

	const dispatch = useDispatch(); 
	const alert = useAlert();
 
	const { createproduct } = useSelector((state) => state.createproduct);

	const { loading, isAuthenticated, error } = useSelector((state) => state.createproduct);

	// const [name, setName] = useState("");
	// const [number, setNumber] = useState(0);
	// const [price, setPrice] = useState(0);
	// const [Stock, setStock] = useState(0);
	// const [description, setDescription] = useState("");
	// const [images, setImages] = useState();
	// const [imagesPreview, setImagesPreview] = useState("/Profile.png");
	
	const [ product , setProduct ] = useState({
		name: '',
		number: '',
		price: '',
		Stock:'',
		description:'',
	});

	const { name, number, price,Stock,description } = product;

	const [ images, setImages] = useState(
		'https://raw.githubusercontent.com/meabhisingh/mernProjectEcommerce/master/frontend/src/images/Profile.png'
	);
	const [ imagesPreview, setImagesPreview ] = useState(
		'https://raw.githubusercontent.com/meabhisingh/mernProjectEcommerce/master/frontend/src/images/Profile.png'
	); 

	const createProductSubmit = (e) => {

		e.preventDefault();
	
		const myForm = new FormData();
	
		myForm.set("name", name);
		myForm.set("number", number);
		myForm.set("price", price);
		myForm.set("Stock", Stock);
		myForm.set("description", description);
		myForm.set("images", images);
		dispatch(createProduct(myForm));
	  };
 
	  const registerDataChange = (e) => {
		if (e.target.name === 'avatar') {
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

	//   useEffect(() => {
	// 	if (product) {
	// 		setName(product.name);
	// 		setNumber(product.number);
	// 		setPrice(product.price);
	// 		setStock(product.Stock);
	// 		setDescription(product.description);
	// 		setImagesPreview(product.images.url);
	// 	}
	
	// 	if (error) {
	// 	  alert.error(error);
	// 	  dispatch(clearErrors());
	// 	}
	
	// 	if (isUpdated) {
	// 	  alert.success("Profile Updated Successfully");
	// 	  dispatch(loadUser());
	
	// 	  history.push("/");
	
	// 	  dispatch({
	// 		type: UPDATE_PROFILE_RESET,
	// 	  });
	// 	}
	//   }, [dispatch, error, alert, history, user, isUpdated]);


	useEffect(() => {
		if (error) {
		  alert.error(error);
		  dispatch(clearErrors());
		}
	
		// if (isAuthenticated) {
		//   history.push(redirect);
		// }
	  }, [dispatch, error,alert , history, isAuthenticated, ]);
	
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

					<form
						className="updateProfileForm"
						encType="multipart/form-data"
						onSubmit={createProductSubmit}
					>
						<div className="updateProfileName">
							<FaceIcon />
							<input
								type="text"
								placeholder="Product Name"
								required
								name="name"
								value={name}
								onChange={registerDataChange}							
								/>
						</div>
						<div className="updateProfileEmail">
							<MailOutlineIcon />
							<input
								type="Number"
								placeholder="Phone Number"
								required
								name="number"
								value={number}
								onChange={registerDataChange}	
							/>
						</div>
						<div className="updateProfileEmail">
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
							<select id="category" name="category">
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

						<div id="updateProfileImage">
							{/* <img src={avatarPreview} alt="Avatar Preview" /> */}
							<input
								type="file"
								name="images"
								accept="image/*"
								// onChange={updateProfileDataChange}
							/>
						</div>
						<input type="submit" value="Submit" className="updateProfileBtn" />
					</form>
				</div>
			</div>
		</Fragment>
		  )}
		</Fragment>
	);
};

export default Sell;
