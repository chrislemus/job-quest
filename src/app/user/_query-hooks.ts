import { jobQuestApi } from '@api/job-quest';
import { useQuery } from '@tanstack/react-query';

export const useUserProfile = () => {
  const profile = useQuery({
    queryFn: jobQuestApi.user.profile,
    queryKey: ['user', 'profile'],
  });

  return profile;
};
