import axios from 'axios';
const API_URLS = '/api/tickets';

export const getNotes = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URLS}/${id}/notes`, config);

  return await response.data;
};

const noteService = {
  getNotes,
};

export default noteService;
