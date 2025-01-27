import axios from 'axios';
import { boardProps } from '../model/types';

export const getBoard = async () => {
  const res = await axios.get<boardProps[]>('/api/board');
  return res.data;
};
