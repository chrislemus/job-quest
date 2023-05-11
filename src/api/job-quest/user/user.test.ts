import { userService } from './user.service';
import { UserProfileRes } from '@/api/job-quest/user/dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { server } from '@/tests/server';
import { rest } from 'msw';

describe('UserService', () => {
  test('profile() contains valid global server handlers', async () => {
    const res = await userService
      .profile()
      .then((res) => plainToInstance(UserProfileRes, res));

    await validateOrReject(res);
  });

  test('profile() validates response data', async () => {
    // return invalid response data
    server.use(
      rest.get(jobQuestApiUrls.user.profile, (_req, res, ctx) => {
        return res(ctx.json({}));
      })
    );

    let error = false;
    await userService.profile().catch((_e: any) => (error = true));

    expect(error).toBeTruthy();
  });
});
