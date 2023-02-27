import express from 'express';
import {
  createTickets,
  deleteTicket,
  getTickets,
  singleTicket,
  updateTicket,
} from '../controller/ticketController.js';
import protect from '../middleware/authMiddleware.js';
import noteRouter from './noteRoute.js';

const ticketRouter = express.Router();

// re-route to note router.
ticketRouter.use('/tickets/:ticketId/notes', noteRouter);

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
