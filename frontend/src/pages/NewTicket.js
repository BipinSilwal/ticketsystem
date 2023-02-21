import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('iphone');
  const [description, setDescription] = useState('');

  const submitHandle = (e) => {
    e.preventDefault();

    const ticketData = {
      product,
      description,
    };
    console.log(ticketData);
  };

  return (
    <>
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
