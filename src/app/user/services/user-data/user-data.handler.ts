import { rest } from '@/tests/server';
import { userProfileMock } from './mocks/user.mock';
import { UserProfileDto } from '@/app/user/services/user-data/dto';
import { userDataApiUrlConstant } from './user-data-api-url.constant';

export const userServiceHandlers = [
  rest.get(userDataApiUrlConstant.profile, (_req, res, ctx) => {
    const data: UserProfileDto = userProfileMock;

    return res(ctx.json(data));
  }),
];
