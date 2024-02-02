import express from "express";
import ip from "ip";
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './services/response.js'
import HttpStatus from "./utils/httpStatusCodes.js";
import clientRoutes from "./routes/client.route.js";

//environment variables 
dotenv.config();

const PORT = process.env.SERVER_PORT || 4000;

const app = express();

//middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/clients', clientRoutes)

//Initial route and error routes
app.get('/', (req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'MyClientAPI - Available')));
app.all('*', (req, res) => res.status(HttpStatus.NOT_FOUND.code)
    .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist')));

//later add localhost instead of ip.address and console.log instead of logger.info
app.listen(PORT, () => 
    console.log(`Server running on: ${ip.address()}:${PORT}`)
)