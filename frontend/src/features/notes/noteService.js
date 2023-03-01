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

export const createNote = async (noteText, id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URLS}/${id}/notes`,
    { text: noteText },
    config
  );

  return await response.data;
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;
