import React from 'react';
import './Footer.css'

const Footer = () => {
	return (
		<footer id="footer">
			{/* <div className="leftFooter">
				<h4>DOWNLOAD OUR APP</h4>
				<p>Download App for Android and IOS mobile phone</p>
				<img
					src={
						'https://raw.githubusercontent.com/meabhisingh/mernProjectEcommerce/master/frontend/src/images/playstore.png'
					}
					alt="playstore"
				/>
				<img
					src={
						'https://raw.githubusercontent.com/meabhisingh/mernProjectEcommerce/master/frontend/src/images/Appstore.png'
					}
					alt="Appstore"
				/>
			</div> */}
			<div className='leftFooter'>
			<img
					src={
						'https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=612x612&w=0&h=waK8qOHV2Fgz2ntEWHWBQtXpNDAQ_wdhd4tkTUz6tfE='
						}
					
				/>
			</div>

			<div className="midFooter">
				<h1>Xchange Bazaar.</h1>
				<p>High Quality is our first priority</p>

				<p>Copyrights 2021 &copy; XchangeBazaar</p>
			</div>

			<div className="rightFooter">
				<h4>Follow Us</h4>
				<a href="http://instagram.com">Instagram</a>
				<a href="http://youtube.com">Youtube</a>
				<a href="http://instagram.com">Facebook</a>
			</div>
		</footer>
	);
};

export default Footer;
