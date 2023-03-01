import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';

import {
  singleTicket,
  reset,
  closeTicket,
} from '../features/ticket/ticketSlice.js';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { getNotes, createNote } from '../features/notes/noteSlice.js';
import NoteItems from '../components/NoteItems.js';
import Modal from 'react-modal';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

const SingleTicket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [noteText, setNoteText] = useState('');

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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onNoteSubmit = (e) => {
    e.preventDefault();

    dispatch(createNote({ noteText, ticketId }));
    closeModal();
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

        {ticket.status !== 'closed' && (
          <button className="btn" onClick={openModal}>
            <FaPlus /> Add Notes
          </button>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note"
        >
          <h2>Add Note</h2>
          <button className="btn-close" onClick={closeModal}>
            X
          </button>
          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea
                name="noteText"
                id="noteText"
                className="form-control"
                placeholder="Note text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>

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
