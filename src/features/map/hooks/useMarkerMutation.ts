import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMarker } from '../api/postMarker';

export function useMarkerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postMarker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markers'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
