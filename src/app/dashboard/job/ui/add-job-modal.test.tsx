import { screen } from '@testing-library/react';
import { renderWithQueryClient } from '@/tests/query-client';
import { AddJobModal } from './add-job-modal';
import userEvent from '@testing-library/user-event';
import { rest, server } from '@/tests/server';
import { CreateJobDto } from '@/app/dashboard/job/dto';
import { DashboardStoreProvider } from '@/app/dashboard/store';
import { JobDto } from '../services';
import { jobDataApiUrlConstant } from '../services/job-data/job-data-api-url.constant';
import { jobListMocks } from '../../job-list/services/job-list-data/mocks';

describe('Add Job Modal', () => {
  let active = true;
  const toggle = () => (active = !active);
  beforeEach(() => {
    active = true;
  });

  it('On valid submit, modal sends post request', async () => {
    const jobList = jobListMocks[0];
    let postData: Record<string, any> = {};
    server.use(
      rest.post(jobDataApiUrlConstant.root, async (req, res, ctx) => {
        const reqData = await req.json<CreateJobDto>();
        postData = reqData;
        const resData: JobDto = {
          id: jobList.id,
          company: reqData.company,
          title: reqData.title,
          jobListId: reqData.jobListId as unknown as string,
          jobListRank: 'a',
          userId: `1`,
        };
        return res(ctx.status(201), ctx.json(resData));
      })
    );

    renderWithQueryClient(
      <DashboardStoreProvider>
        <AddJobModal toggle={toggle} active={active} />
      </DashboardStoreProvider>
    );
    const data = {
      company: 'acme',
      title: 'UX Designer',
      jobList: jobList.id,
    };
    await screen
      .findByTestId('input-company')
      .then((f) => userEvent.type(f, data.company));
    await screen
      .findByTestId('input-title')
      .then((f) => userEvent.type(f, data.title));
    await screen
      .findByTestId('input-job-list')
      .then((dropdown) => userEvent.click(dropdown))
      .then(() => screen.findByRole('option', { name: jobList.label }))
      .then((optionElement) => userEvent.click(optionElement));
    const submitButton = await screen.findByRole<HTMLButtonElement>('button', {
      name: /add/i,
    });
    await userEvent.click(submitButton);
    expect(postData.jobListId).toBe(jobList.id);
    expect(postData.company).toBe(data.company);
    expect(postData.title).toBe(data.title);
  });
  it('On invalid submit, modal form displays error', async () => {
    renderWithQueryClient(
      <DashboardStoreProvider>
        <AddJobModal active={active} toggle={toggle} />
      </DashboardStoreProvider>
    );
    const submitButton = await screen.findByRole<HTMLButtonElement>('button', {
      name: /add/i,
    });
    await userEvent.click(submitButton);
    await screen.findByText(/company should not be empty/i).then((el) => {
      expect(el).toBeTruthy();
    });
    await screen.findByText(/title should not be empty/i).then((el) => {
      expect(el).toBeTruthy();
    });
  });
});
