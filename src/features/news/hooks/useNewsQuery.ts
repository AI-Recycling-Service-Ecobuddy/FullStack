import { useQuery } from '@tanstack/react-query';
import { getNews } from '../api/getNews';

export function useNewsQuery() {
  return useQuery({
    queryKey: ['news'],
    queryFn: getNews,
    staleTime: 1000 * 60 * 5,
  });
}
