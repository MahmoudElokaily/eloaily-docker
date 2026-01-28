const express = require('express')
const mongoose = require('mongoose');
const { createClient } = require("redis");
// const { Client } = require('pg')
// const url = require("node:url");


const port = process.env.PORT || 4000;
const app = express();

// connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';
const redisClient = createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on('error' , err => console.log('Redis Client Error', err));
redisClient.on('connect' ,()  => console.log('Redis Client Connected ...'));
redisClient.connect();

// connect DB


// const DB_USER = 'postgres';
// const DB_PASS = 'example';
// const DB_PORT = 5432;
// const DB_HOST = 'postgres';
// const DB_NAME = "postgres";
// const URL = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`;
//
// const client = new Client({
//     host: DB_HOST,
//     port: DB_PORT,
//     user: DB_USER,
//     password: DB_PASS,
//     database: DB_NAME,
// });
//
// client.connect()
//     .then(() => console.log('DB Connected Successfully to postgres'))
//     .catch(err => console.log("Failed to connect db: " , err));



const DB_USER = 'root';
const DB_PASS = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo';
const URL = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`;
mongoose.connect(URL)
    .then(() => console.log('DB Connected Successfully'))
    .catch(err => console.log("Failed to connect db: " , err));


app.get('/', (req, res) => {
    redisClient.set('product', 'iphone 16');
    res.send('<h1>Hello Test!</h1>');

});
app.get('/data',async (req, res) => {
    const product = await redisClient.get('product');
    res.send(`<h1>${product}</h1>`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

