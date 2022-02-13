const fs = require('fs');
const path = require('path');
const detail =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper massa quam. Sed varius lobortis est, quis posuere leo rhoncus sit amet. Proin pellentesque orci condimentum orci faucibus iaculis. Maecenas a fringilla sem. Maecenas consectetur, eros non sodales tristique, enim ligula fringilla dolor, malesuada sagittis nunc turpis nec diam. Sed varius tortor id lectus iaculis sollicitudin. Suspendisse in turpis erat. Nunc sit amet ligula et lacus molestie molestie. Phasellus mi dui, congue ut arcu et, pellentesque lacinia odio.";
const p = path.join(__dirname, "..", "data", "products.json");
const getAllProduct = cb =>{
    fs.readFile(p, (err, data)=>{
        if(!err){
            cb(JSON.parse(data));
        }else{
            cb([]);
        }
    })
}
class Product{
    constructor(id,name, price, desc){
        this.prodName = name;
        this.price = price;
        this.desc = desc;
        this.detail = detail;
        this.id = id;
    }
    save(){
        getAllProduct(prods=>{
            if (this.id) {
				const idx = prods.findIndex(prod=>prod.id === this.id);
                const products  = [...prods];
                products[idx] = this;
                fs.writeFile(p, JSON.stringify(products), err=>{
                    if(err){
                        console.log(err);
                    }
                })
			}else{
                this.id = Math.floor(Math.random() * 1000000).toString();
				prods.push(this);
				fs.writeFile(p, JSON.stringify(prods), (error) => {
					if (error) {
						console.log(error);
					}
				});
            }
        })
    }
    static fetchAll(cb){
        getAllProduct(cb)
    }
    static findById(id,cb){
        getAllProduct(products=>{
            let p = products.find(prod=>prod.id === id);
            cb(p)
        })
    }
    static deleteOne(id,cb){
        getAllProduct(products=> {
			let updatedProds = products.filter(
				(prod) => prod.id.trim() !== id.trim()
			);
			fs.writeF(p, JSON.stringify(updatedProds), (err) => {
				if (err){
                    console.log(err);
                    cb(updatedProds);
                }else{
                    cb();
                }
                
			});
		});
    }

}
module.exports= {
    Product:Product,
}





