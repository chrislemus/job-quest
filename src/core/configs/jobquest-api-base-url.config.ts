export const jobQuestApiConfig = {
  get baseUrl() {
    const url = process.env.NEXT_PUBLIC_JOB_QUEST_API_ROOT_URL;
    if (!url) {
      throw new Error('NEXT_PUBLIC_JOB_QUEST_API_ROOT_URL is not defined');
    }
    return url;
  },
};
