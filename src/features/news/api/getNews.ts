import axios from 'axios';
import { NewsItem } from '../model/types';

export const getNews = async () => {
  const response = await axios.get<{ items: NewsItem[] }>('/api/news', {
    params: {
      query: '재활용',
      display: 5,
      start: 1,
      sort: 'sim',
    },
  });
  return response.data.items;
};
