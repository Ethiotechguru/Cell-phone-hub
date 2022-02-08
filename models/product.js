// const products = [];
const path = require('path');
const fs = require('fs')

class Product{
    constructor(name, price, desc){
        this.prodName = name;
        this.price = price;
        this.desc = desc;
        this.id = Math.floor(Math.random()*1000000).toString();
    }
    save(){
        const p = path.join(__dirname, '..', "data", "products.json");
        let products = []
        fs.readFile(p, (error, data)=>{
            if(!error){
                products = JSON.parse(data);
            }
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
				console.log(err);
			});
        })
        
    }
    static fetchAll(cb){
        const p = path.join(__dirname, "..", "data", "products.json");
        fs.readFile(p, (err, data)=>{
            if(!err){
                console.log(JSON.parse(data), 'is coming from fetch');
                let products =  JSON.parse(data);
                cb(products)
            }else{
                cb([])
            }
        });
    }
}
module.exports= {
    Product:Product,
}
