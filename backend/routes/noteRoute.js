import express from 'express';
import { createNotes, getNotes } from '../controller/noteController.js';
import protect from '../middleware/authMiddleware.js';

const noteRouter = express.Router({ mergeParams: true });

noteRouter.route('/').get(protect, getNotes).post(protect, createNotes);

export default noteRouter;
