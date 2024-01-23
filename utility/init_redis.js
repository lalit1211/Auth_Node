// const redis = require("redis");

// const data = {
// 	key: "foo",
// 	val: "barGVH",
// 	ex: 20,
// 	query: "set"
// }

// const clientt =async({} )=>{
// 	const client = redis.createClient({
// 		socket: {
// 			host: "redis-15137.c321.us-east-1-2.ec2.cloud.redislabs.com",
// 			port: 15137,
// 		},
// 		password: "bIK2JBTJ2PkwvzmHaSWQUTP5iuWA3qxu",
// 	});

// 	client.on("ready", () => {
// 		console.log("redis is connected");
// 	});

// 	client.on("error", (err) => {
// 		console.log("redis is disconnected: ", err);
// 	});
	
// 	client.connect()
	

// 	if(data.query=='set'){
// 		await client.SET(data.key, data.val, 'EX', 20, (err, ds)=>{
// 			if (err) {
// 				console.log(err.message);
// 				// reject(createError.InternalServerError());
// 				return;
// 			}
// 		})
// 	} 
// 	// await client.SET('FOOmmmm', 'BAR')
// 	// await client.DEL('FOO')
// 	// console.log(await client.GET('FOO'))
// 	// return client
// } 
//  clientt( data)
// console.log(await n.set('lll', 'llll'))
// clientt.client.SET("nnn", "nnnnn")


// /import { createClient } from 'redis';

// const client = redis
// 	.createClient({
// 		host: "redis-15137.c321.us-east-1-2.ec2.cloud.redislabs.com",
// 		port: 15137
// 	})
// 	.on("error", (err) =>
// 		console.log("Redis Client Error", err),
// 	)
// 	.connect();

// await client.set('key', 'value');
// const value = await client.get('key');
// await client.disconnect();


const Redis = require("ioredis");
const redis = new Redis({
	port: 15137,
	host: "redis-15137.c321.us-east-1-2.ec2.cloud.redislabs.com",
	// username: "test",
	password: "bIK2JBTJ2PkwvzmHaSWQUTP5iuWA3qxu",
	// db: 0, // Defaults to 0
});

redis.on('connect', ()=>{
	console.log('conected')
})
redis.set("mykey", "value", 'EX', 20); 
const dat = redis.get("mykey")
console.log(dat)
