const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require('dotenv').config();
const url = process.env.URL;
let _db;
const mongoConnection = ()=>{
    return MongoClient.connect(url)
		.then((client) => {
			console.log("Mongo db is connected");
			_db = client.db("shop");
		})
		.catch((err) => console.log(err));
}

const getDb = ()=>{
    if(_db){
        return _db;
    }
    throw new Error('data base connection failed! please check if you are connected to the data base')
}
exports.mongoConnection = mongoConnection;
exports.getDb = getDb;

