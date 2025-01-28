import axios from 'axios';

export const getTrashCanInfo = async () => {
  const res = await axios.get('api/map/openapi-trashcan');
  return res.data;
};
