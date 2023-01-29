![Vercel](https://vercelbadge.vercel.app/api/chrislemus/job-quest)
![app-test](https://github.com/chrislemus/job-quest/actions/workflows/test.yaml/badge.svg)

# Job Quest

An intuitive web app to organize your job search. Store information on job postings and keep track of job applications.

![user-log-in](/readme-assets/app-previews/dashboard.png)

**Table of Contents**

- [Job Quest](#job-quest)
  - [Technology Stack](#technology-stack)
  - [Deployment](#deployment)
  - [Installation](#installation)
  - [Operation](#operation)
  - [Live Preview](#live-preview)
  - [Screenshot](#screenshots)

## Technology Stack

1. Next JS - React w/ Typescript (framework)
2. Material UI (styling)
3. React Hook Form (form handling)
4. React Query (server fetch/caching)

## Deployment

[Vercel](https://vercel.com/) handles app deployment.

## Installation

1. Download and run project backend - [go to backend repo](https://github.com/chrislemus/job-quest-api)
2. Download this repository
3. Run the node version specified in `.nvmrc`.
   - You could run `nvm use` if you have [nvm](https://github.com/nvm-sh/nvm) installed in your machine.
4. Install dependencies `npm install`
5. Run build command
   - `npm run build` builds app for production.
   - `npm run dev` builds app in development/watch mode.
     - after running this command the cli will provide a url to preview the app (eg. http://localhost:3000).

## Operation

Once logged in, the main dashboard may contain a few cards representing a job posting. Click on any card to view/edit job information.

All jobs are categorized by **Job List** type (ie. Queue, Applied, Interview, Offer, etc). The **Job List** tab menu will display your jobs based on the selected **Job List** type.

## Live Preview

[Check out the live demo here!](http://localhost:3002/projects/8/demo)

## Screenshots

### Log In

![user-log-in](/readme-assets/app-previews/login.gif)

### Job Updates

![user-log-in](/readme-assets/app-previews/job-updates.gif)

### Job Shortcuts/Navigation

![user-log-in](/readme-assets/app-previews/job-shortcuts-navigation.gif)
