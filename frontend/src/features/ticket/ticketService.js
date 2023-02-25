import axios from 'axios';

const API_URLS = '/api/tickets';
const API_URL = '/api/ticket';

const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URLS}`, ticketData, config);

  return response.data;
};

const getTicket = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URLS}`, config);

  console.log(response.data);
  return response.data;
};

const getSingleTicket = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}`, config);

  console.log(response.data);
  return response.data;
};

const getCloseTicket = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/${id}`,
    { status: 'closed' },
    config
  );

  console.log(response.data);
  return response.data;
};

const ticketService = {
  createTicket,
  getTicket,
  getSingleTicket,
  getCloseTicket,
};

export default ticketService;
