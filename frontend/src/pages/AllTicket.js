import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTicket, reset } from '../features/ticket/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

const AllTicket = () => {
  const { isLoading, isSuccess, message, tickets } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTicket());
  }, [dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <BackButton URL="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Products</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};

export default AllTicket;
