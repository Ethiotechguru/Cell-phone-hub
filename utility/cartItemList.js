module.exports = function cartItemHelper(items, products) {
	let cartItems = [];
	for (let item of items) {
		for (let prod of products) {
			if (parseInt(prod.id) === parseInt(item.id)) {
				cartItems.push({
					prodName: prod.prodName,
					price: parseFloat(prod.price) * parseInt(item.qty),
					desc: prod.desc,
					qty: item.qty,
					cId: item.id,
				});
			}
		}
	}
	return cartItems;
};
