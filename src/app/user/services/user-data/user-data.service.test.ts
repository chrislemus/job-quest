import { userService } from './user-data.service';
import { UserProfileDto } from '@/app/user/services/user-data/dto';
import { server } from '@/tests/server';
import { rest } from 'msw';
import { userDataApiUrlConstant } from './user-data-api-url.constant';

describe('UserService', () => {
  test('profile() contains valid global server handlers', async () => {
    const res = await userService.profile();
    UserProfileDto.parse(res);
  });

  test('profile() validates response data', async () => {
    // return invalid response data
    server.use(
      rest.get(userDataApiUrlConstant.profile, (_req, res, ctx) => {
        return res(ctx.json({}));
      })
    );

    let error = false;
    await userService.profile().catch((_e: any) => (error = true));

    expect(error).toBeTruthy();
  });
});
