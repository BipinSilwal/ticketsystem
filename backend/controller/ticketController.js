import Ticket from '../model/ticketModel.js';
import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';

// all tickets.
export const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found!!');
  }

  const tickets = await Ticket.find({ user: req.user.id });

  return res.status(200).json(tickets);
});

// single ticket...
export const singleTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found!!');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found!!');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error('Not Authorized!!');
  }

  return res.status(200).json(ticket);
});

// create Ticket
export const createTickets = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error(' pls add a product or description');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found!!');
  }

  const tickets = await Ticket.create({
    product,
    description,
    user: req.user.id,
  });

  return res.status(200).json({
    message: ' ticket created successfully!!',
    tickets,
  });
});

// update ticket...
export const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found!!');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found!!');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error('Not Authorized!!');
  }

  const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.status(200).json(updateTicket);
});

export const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found!!');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found!!');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error('Not Authorized!!');
  }

  await ticket.remove();

  return res.status(200).json({
    success: true,
    message: 'successfully deleted',
  });
});
