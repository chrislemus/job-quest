let root = process.env.NEXT_PUBLIC_JOB_QUEST_API_ROOT_URL;
const url = (resource: string): string => `${root}${resource}`;

/**
 * Job Quest Api Urls
 */
export const jobQuestApiUrls = {
  root: root,
  user: { profile: url('/user/profile') },
};
