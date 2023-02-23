import React from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const BackButton = ({ URL }) => {
  return (
    <>
      <Link to={URL} className="btn btn-reverse btn-back">
        <FaArrowCircleLeft />
        Back
      </Link>
    </>
  );
};

export default BackButton;
