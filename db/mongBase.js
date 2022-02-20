const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;


let _db;
const mongoConnection = ()=>{
    return MongoClient.connect(
		"mongodb+srv://project2_0:project2_0@cluster0.op597.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
	)
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

