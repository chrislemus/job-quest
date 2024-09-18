import { userProfileMock } from './mocks/user.mock';
import { UserProfileDto } from '@/app/user/services/user-data/dto';
import { userDataApiUrlConstant } from './user-data-api-url.constant';
import { http, HttpResponse } from 'msw';

export const userServiceHandlers = [
  http.get<never, never, UserProfileDto>(userDataApiUrlConstant.profile, () => {
    const data: UserProfileDto = userProfileMock;

    return HttpResponse.json(data);
  }),
];
