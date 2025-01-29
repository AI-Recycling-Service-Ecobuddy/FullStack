import axios from 'axios';

export const getMarkers = async () => {
  const res = await axios.get('/api/map/markers');
  return res.data;
};
