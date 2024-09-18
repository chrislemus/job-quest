import { userService } from './user-data.service';
import { UserProfileDto } from '@/app/user/services/user-data/dto';
import { server } from '@/tests/server';
import { userDataApiUrlConstant } from './user-data-api-url.constant';
import { http, HttpResponse } from 'msw';

describe('UserService', () => {
  test('profile() contains valid global server handlers', async () => {
    const res = await userService.profile();
    UserProfileDto.parse(res);
  });

  test('profile() validates response data', async () => {
    // return invalid response data
    server.use(
      http.get(userDataApiUrlConstant.profile, () => {
        return HttpResponse.json(null);
      })
    );

    let error = false;
    await userService.profile().catch((_e: any) => (error = true));

    expect(error).toBeTruthy();
  });
});
