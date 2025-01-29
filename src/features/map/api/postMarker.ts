import axios from 'axios';
import { Marker } from '../model/types';

export const postMarker = async (data: Marker) => {
  const res = await axios.post('/api/map', data);
  return res.data;
};
