import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandle = (e) => {
    e.preventDefault();

    if (!password) {
      toast.error('Invalid Credentials');
    } else {
      toast.success('Login successfully!!');
      const data = formData;
      console.log(JSON.stringify(data));
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Please Login to get Support</p>
      </section>

      <section className="form">
        <form onSubmit={submitHandle}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your Password"
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-block">Submit</button>
        </form>
      </section>
    </>
  );
};

export default Login;
