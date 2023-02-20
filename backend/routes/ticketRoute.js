import express from 'express';
import {
  createTickets,
  deleteTicket,
  getTickets,
  singleTicket,
  updateTicket,
} from '../controller/ticketController.js';
import protect from '../middleware/authMiddleware.js';

const ticketRouter = express.Router();

ticketRouter
  .route('/tickets')
  .get(protect, getTickets)
  .post(protect, createTickets);

ticketRouter
  .route('/ticket/:id')
  .get(protect, singleTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

export default ticketRouter;
