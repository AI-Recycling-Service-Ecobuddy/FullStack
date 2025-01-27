import axios from 'axios';

export const getRecycleDetails = async () => {
  const res = await axios.get('/api/recycledetail');
  return res.data;
};
