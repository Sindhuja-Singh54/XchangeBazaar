import React, { Fragment, useState, useEffect } from 'react';
// import "./UpdateProfile.css";
import Loader from '../layout/loader/Loader';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updateProfile, loadUser } from '../../actions/UserAction';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/UserConstants';
import MetaData from '../layout/Header/MetaData';

const categories = [ 'Laptop', 'Footwear', 'Bottom', 'Tops', 'Attire', 'Camera', 'SmartPhones' ];

const Sell = () => {
	return (
		// <Fragment>
		//   {loading ? (
		//     <Loader />
		//   ) : (
		<Fragment>
			<MetaData title="Update Profile" />
			<div className="updateProfileContainer">
				<div className="updateProfileBox">
					<h2 className="updateProfileHeading">Sell</h2>

					<form
						className="updateProfileForm"
						encType="multipart/form-data"
						// onSubmit={updateProfileSubmit}
					>
						<div className="updateProfileName">
							<FaceIcon />
							<input
								type="text"
								placeholder="Product Name"
								required
								name="productname"
								// value={name}
								// onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="updateProfileEmail">
							<MailOutlineIcon />
							<input
								type="Number"
								placeholder="Phone Number"
								required
								name="number"
								// value={email}
								// onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="updateProfileEmail">
							<input
								type="text"
								maxLength={4}
								placeholder="Price"
								required
								name="price"
								// value={email}
								// onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="updateProfileEmail">
							<input
								type="Number"
								maxLength={4}
								placeholder="Stock"
								required
								name="stock"
								// value={email}
								// onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="updateProfileEmail">
							<input
								type="text"
								maxLength={50}
								placeholder="Description"
								required
								name="description"
								// value={email}
								// onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<label for="category">Choose a Category:</label>
						<select id="category" name="category">
							<option value="lab_coat">Lab coat</option>
							<option value="book">Book</option>
							<option value="fan">Fan</option>
							<option value="laptop">Laptop</option>
							<option value="footwear">Footwear</option>
							<option value="smartPhones">SmartPhones</option>
							<option value="attire">Attire</option>
							<option value="trunk">Trunk</option>
							<option value="fan">Fan</option>
						</select>

						<div id="updateProfileImage">
							{/* <img src={avatarPreview} alt="Avatar Preview" /> */}
							<input
								type="file"
								name="avatar"
								accept="image/*"
								// onChange={updateProfileDataChange}
							/>
						</div>
						<input type="submit" value="Update" className="updateProfileBtn" />
					</form>
				</div>
			</div>
		</Fragment>
		//   )}
		// </Fragment>
	);
};

export default Sell;
