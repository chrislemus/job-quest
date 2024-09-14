import { rest } from '@/tests/server';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { userProfileMock } from './user.mocks';
import { UserProfileRes } from '@/app/user/services/user-data/dto';

export const userServiceHandlers = [
  rest.get(jobQuestApiUrls.user.profile, (_req, res, ctx) => {
    const data: UserProfileRes = userProfileMock;

    return res(ctx.json(data));
  }),
];
