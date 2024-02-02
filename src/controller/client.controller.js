import database from '../config/mysql.config.js';
import Response from '../services/response.js';
import QUERY from '../services/client.query.js';
import HttpStatus from '../utils/httpStatusCodes.js';

export const getClients = (req, res) => {
    console.log(`${req.method} ${req.originalUrl}, fetching clients`);

    database.query(QUERY.SELECT_CLIENTS, (error, results) => {
        if(!results) {
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No clients found`))
        } else {
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Clients retrieved`, { clients: results }))
        }
    })
};

export const createClient = (req, res) => {
    console.log(`${req.method} ${req.originalUrl}, creating client`);

    database.query(QUERY.CREATE_CLIENT, Object.values(req.body), (error, results) => {
        if(!results) {
            console.log(error.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Client not created. An error occurred`))
        } else {
            const client = { id: results.insertId, ...req.body, created_at: new Date() };
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Client retrieved`, { client }))
        }
    })
};

export const getClientById = (req, res) => {
    console.log(`${req.method} ${req.originalUrl}, fetching client`);

    database.query(QUERY.SELECT_CLIENT_BY_ID, [req.params.id], (error, results) => {
        if(!results[0]) {
            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Error occurred`))
        } else {
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Client retrieved`, results[0] ))
        }
    })
};

export const updateClient = (req, res) => {
    console.log(`${req.method} ${req.originalUrl}, fetching client`);

    database.query(QUERY.SELECT_CLIENT_BY_ID, [req.params.id], (error, results) => {
        if(!results[0]) {
            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Client by id ${req.params.id} was not found`))
        } else {
            console.log(`${req.method} ${req.originalUrl}, updating clients`);
            database.query(QUERY.UPDATE_CLIENT, [...Object.values(req.body), req.params.id], (error, results) => {
                if(!error){
                    res.status(HttpStatus.OK.code)
                    .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Client updated`, { id: req.params.id, ...req.body} ))
                } else {
                    console.log(error.message)
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                    .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`))
                }
            });
        }
    })
};

export const deleteClient = (req, res) => {
    console.log(`${req.method} ${req.originalUrl}, deleting client`);

    database.query(QUERY.DELETE_CLIENT, [req.params.id], (error, results) => {
        if(results.affectedRows > 0) {
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Client deleted`, results[0]))
        } else {
            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Client by id ${req.params.id} was not found`))
        }
    });
};