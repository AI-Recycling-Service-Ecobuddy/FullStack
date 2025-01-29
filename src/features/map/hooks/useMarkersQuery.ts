import { useQuery } from '@tanstack/react-query';
import { getMarkers } from '../api/getMarkers';

export function useMarkersQuery() {
  return useQuery({
    queryKey: ['markers'], // 캐싱할 키 설정
    queryFn: getMarkers,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 유효함
  });
}
