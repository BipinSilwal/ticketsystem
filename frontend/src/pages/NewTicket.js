import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTicket, reset } from '../features/ticket/ticketSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/tickets');
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('iphone');
  const [description, setDescription] = useState('');

  const submitHandle = (e) => {
    e.preventDefault();

    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton URL="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            readOnly
          />
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              readOnly
            />
          </div>

          <form onSubmit={submitHandle}>
            <div className="form-group">
              <label htmlFor="product">Product</label>
              <select
                name="product"
                id="product"
                value={product}
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
              >
                <option value="iphone">iphone</option>
                <option value="MacBook Pro">Macbook Pro</option>
                <option value="iMac">iMac</option>
                <option value="iPad">iPad</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description of the issue</label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn btn-block">submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewTicket;
