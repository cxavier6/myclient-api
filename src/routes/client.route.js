import express from 'express';
import { getClients, createClient, getClientById, updateClient, deleteClient } from '../controller/client.controller.js';

const clientRoutes = express.Router();

clientRoutes.route('/')
    .get(getClients)
    .post(createClient);

clientRoutes.route('/:id')
    .get(getClientById)
    .put(updateClient)
    .delete(deleteClient);

export default clientRoutes;