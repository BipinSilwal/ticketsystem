import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  singleTicket,
  reset,
  closeTicket,
} from '../features/ticket/ticketSlice.js';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { getNotes } from '../features/notes/noteSlice.js';
import NoteItems from '../components/NoteItems.js';

const SingleTicket = () => {
  const { ticketId } = useParams();

  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(singleTicket(ticketId));
    dispatch(getNotes(ticketId));
    //eslint-disable-next-line
  }, [isError, ticketId, message]);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  const buttonCloseHandle = () => {
    dispatch(closeTicket(ticketId));
    toast.success('ticket closed!!');

    navigate('/');
  };

  return (
    <>
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton URL={'/tickets'} />
          <h2>
            Ticket ID: {ticket._id}
            <span className={`state status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
          <h2>Notes</h2>
        </header>
        {notes.map((note) => (
          <NoteItems key={note._id} note={note} />
        ))}
        {ticket.status !== 'closed' && (
          <button
            onClick={buttonCloseHandle}
            className="btn btn-block btn-danger"
          >
            Close Ticket
          </button>
        )}
      </div>
    </>
  );
};

export default SingleTicket;
