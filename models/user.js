const req = require('express/lib/request');

const getDb = require('../db/mongBase').getDb;
class User{
    constructor(userName, email, cart,order, id){
        this.name = userName;
        this.email = email;
        this.cart = cart;
        this.order = order;
        this._id = id;
    }
    save(){
        const db = getDb();
        return db.collection('users').insertOne(this)
        .then(user=>{
            console.log("User is added")
        }).catch(err=>{
            console.log(err)
        })
    }
    addToCart(product){
        let prod = {
			prodId: product._id,
			title: product.title,
			price: product.price,
			imgUrl: product.imgUrl,
			quantity: 1,
		};
        let updatedCart;
        const prodIndex = this.cart.items.findIndex((cp) => {
            if(cp){
                return cp.prodId.toString() === product._id.toString();
            }
        });
        if ((prodIndex || prodIndex===0) && prodIndex !== -1) {
			updatedCart = [...this.cart.items];
			updatedCart[prodIndex].quantity =
				updatedCart[prodIndex].quantity + 1;
		} else {
			updatedCart = [...this.cart.items, prod];
		}
        const db = getDb();
        db.collection("users").updateOne(
			{ _id: this._id },
			{ $set: { cart: {items:updatedCart} } }
		);
    }
    checkOut(){
        const db = getDb();
        return db
			.collection("users")
			.updateOne(
				{ _id: this._id },
				{
					$set: {
						order: {
							orderItems: [
								...this.cart.items,
								...this.order.orderItems,
							],
						},
						cart: { items: [] },
					},
				}
			)
			.then((user) => {
				return user;
			})
			.catch((err) => {
				console.log(err);
			});
    }
    getOrders(){
        const db = getDb();
        return  db.collection('users').findOne({_id:this._id})
        .then(user=>{
            return user;
        }).catch(err=>{
            console.log(err)
        })
    }
    static findById(id){
        const db = getDb();
        return db.collection('users').findOne({_id:id})
        .then(user=>{
            return user;
        }).catch(err=>{
            console.log(err)
        })
    }

}


module.exports = User;
