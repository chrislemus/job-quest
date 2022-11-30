# Job Quest

An intuitive webapp to organize your job search. Store information on job postings and keep track of job applications.

![user-log-in](/readme-assets/app-previews/dashboard.png)

**Table of Contents**

- [Job Quest](#job-quest)
  - [Technology Stack](#technology-stack)
  - [Installation](#installation)
  - [Operation](#operation)
  - [Live Preview](#live-preview)
  - [Screenshot](#screenshots)

## Technology Stack

1. React w/ Typescript
2. Material UI
3. React Hook Form
4. React Query
5. Next JS

## Installation

1. Download and run project backend - [go to backend repo](https://github.com/chrislemus/job-quest-api)
2. Download this repository
3. Run the node version specified in `.nvmrc`.
   - You could run `nvm use` if you have [nvm](https://github.com/nvm-sh/nvm) installed in your machine.
4. Install dependencies `npm install`
5. Run build command
   - `npm run build` builds app for production
   - `npm run dev` builds app in development/watch mode
     - after running this command the cli will provide a url to preview the app (eg. http://localhost:3000).

## Operation

Once logged, the main dashboard may contain a few cards, each representing a job posting. Click on any card view/edit information.

All jobs are categorized by **Job List** type (ie. Queue, Applied, Interview, Offer, etc). The **Job List** tab menu will display your jobs based on the selected **Job List** type.

## Live Preview

[Check out the live demo here!](https://job-quest.vercel.app/auth/login)

## Screenshots

### Log In

![user-log-in](/readme-assets/app-previews/login.gif)
