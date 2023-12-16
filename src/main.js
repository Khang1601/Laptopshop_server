/* Load env config */
import dotenv from 'dotenv';
dotenv.config();

/* Express, Create Server */
import express from 'express';
const server = express();

/* File in public folder, api get */
server.use(express.static('public'));

/* Cors */
import cors from 'cors'
server.use(cors());

/* Body parser conver request body to json*/
import bodyParser from 'body-parser';
server.use(bodyParser.json());

/* Apis */
import apiSetup from './routes/index.js';
server.use('/apis', apiSetup);


server.listen(process.env.PORT, () => {
    console.log(`server on at: http://${process.env.HOST}:${process.env.PORT}`)
})