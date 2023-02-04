import { renderHook, screen } from '@testing-library/react';
import { renderWithQueryClient } from '@tests/query-client';
import { AddJobModal } from './add-job-modal';
import userEvent from '@testing-library/user-event';
import { useBoolean } from '@common/hooks';
import { jobListMocks } from '@api/job-quest/job-list/job-list.mocks';
import { rest, server } from '@tests/server';
import { jobQuestApiUrls } from '@api/job-quest/job-quest-api-urls.const';

describe('Add Job Modal', () => {
  test('On valid submit, modal sends post request', async () => {
    const { result } = renderHook(() => useBoolean(true));
    const [active, setActive] = result.current;

    let postData: { company?: string; jobListId?: string; title?: string } = {};

    server.use(
      rest.post(jobQuestApiUrls.job.root, async (req, res, ctx) => {
        postData = await req.json();
        return res(ctx.status(200));
      })
    );

    renderWithQueryClient(
      <AddJobModal active={active} toggleActive={setActive.toggle} />
    );

    const jobList = jobListMocks[0];

    const data = {
      company: 'acme',
      title: 'UX Designer',
      jobList: jobList.id,
    };

    await screen
      .findByRole('textbox', { name: /company/i })
      .then((f) => userEvent.type(f, data.company));

    await screen
      .findByRole('textbox', { name: /title/i })
      .then((f) => userEvent.type(f, data.title));

    await screen
      .findByLabelText(/List/i)
      .then((dropdown) => userEvent.click(dropdown))
      .then(() => screen.findByRole('option', { name: jobList.label }))
      .then((optionElement) => userEvent.click(optionElement));

    const submitButton = await screen.findByRole<HTMLButtonElement>('button', {
      name: /add/i,
    });
    await userEvent.click(submitButton);

    expect(postData.company).toBe(data.company);
    expect(postData.title).toBe(data.title);
    expect(postData.jobListId).toBe(jobList.id);
  });
  test('On invalid submit, modal form displays error', async () => {
    const { result } = renderHook(() => useBoolean(true));
    const [active, setActive] = result.current;

    renderWithQueryClient(
      <AddJobModal active={active} toggleActive={setActive.toggle} />
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
