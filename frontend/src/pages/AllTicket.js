import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTicket, reset } from '../features/ticket/ticketSlice';
import Spinner from '../components/Spinner';

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

  return <div>AllTicket</div>;
};

export default AllTicket;
