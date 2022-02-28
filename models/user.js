const { Timestamp } = require('mongodb');

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
			updatedCart[prodIndex].quantity++;
		} else {
			updatedCart = [...this.cart.items, prod];
		}
        const db = getDb();
        db.collection("users").updateOne(
			{ _id: this._id },
			{ $set: { cart: {items:updatedCart} } }
		);
    }
    deleteCartItem(prodId){
        const updatedCartItems = this.cart.items.filter(
			(item) => item.prodId.toString() !== prodId.toString()
		);
        const db = getDb();
        return db.collection("users").updateOne(
			{ _id: this._id },
			{ $set: { cart: { items: updatedCartItems } } }
		);
    }
    checkOut(){
        const db = getDb();
        return db
			.collection("orders")
			.insertOne({userId:this._id, orderItems:this.cart, date:Date.now()})
			.then((order) => {
                
				this.cart = {items:[]};
                return db.collection('users').updateOne({_id:this._id}, {$set:{cart:{items:[]}}})
			})
			.catch((err) => {
				console.log(err);
			});
    }
    getOrders(){
        const db = getDb();
        return db.collection('orders').find().toArray()
        .then(orders=>{
            const newOrder = []
            orders.forEach(order=>{
                newOrder.push({timeStamp:order.date, items:order.orderItems.items, id:order._id});
            })
            return newOrder;
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
