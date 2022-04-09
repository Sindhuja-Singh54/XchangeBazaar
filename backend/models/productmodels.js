const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'Please Enter product Name' ],
		trim: true
	},
	description: {
		type: String,
		required: [ true, 'Please Enter product Description' ]
	},
	price: {
		type: Number,
		required: [ true, 'Please Enter product Price' ],
		maxLength: [ 8, 'Price cannot exceed 8 character' ]
	},
	ratings: {
		type: Number,
		default: 0
	},
	images:[
		{
		  public_id: {
			type: String,
			required: true,
		  },
		  url: {
			type: String,
			required: true,
		  },
		},
	], 
	category: {
		type: String,
		required: [ true, 'Please Enter Product category' ]
	},
	Stock: {
		type: Number,
		required: [ true, 'please Enter product Stock' ],
		maxLength: [ 4, 'Stock cannot exceed 4 chaeacters' ],
		default: 1
	},
	numOfReviews: {
		type: Number,
		default: 0
	},
	reviews: [
		{
			user: {
				type: mongoose.Schema.ObjectId,
				ref: 'User',
				required: true
			},
			name: {
				type: String,
				required: true
			},
			rating: {
				type: Number,
				required: true
			},
			Comment: {
				type: String,
				required: true
			}
		}
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	createAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Product', productSchema);