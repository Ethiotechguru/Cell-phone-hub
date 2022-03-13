
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	cart: {
		items: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				title: String,
				imgUrl: String,
				price: Number,
				quantity: { type: Number, required: true },
			},
		],
	},
});

userSchema.methods.addToCart = function (product) {
    let idx = this.cart.items.findIndex((item) => {
		return item.productId.toString() === product._id.toString();
	});
	let updatedCartItems = [...this.cart.items];
	if (idx === -1) {
        let newProduct = {
			productId: product._id,
			quantity: 1,
		};
        updatedCartItems.push(newProduct);
    } else {
        updatedCartItems[idx].quantity++;
    }
    this.cart = {items:updatedCartItems};
    return this.save();
};

userSchema.methods.deleteCartItem = function (id) {
    let newCartItems = this.cart.items.filter(item=>{
        return item.productId.toString()!==id.toString();
    });
    this.cart.items = newCartItems;
    return this.save()
}

module.exports = mongoose.model('User', userSchema);

//? Object
//? productId:621dbe8eb60c32ce0de05c6f
//? quantity:1
//? _id:621dc2b2b60c32ce0de05cd7