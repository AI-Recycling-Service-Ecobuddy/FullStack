import axios from 'axios';

export const getTrashCanInfo = async () => {
  const res = await axios.get('api/map/markers');
  return res.data;
};
