import '@src/styles/bulma.sass';
import { PropsWithChildren } from 'react';

export default function RootLayout(p: PropsWithChildren<{}>) {
  return (
    <html>
      <head>
        <title>Job Quest</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{p.children}</body>
    </html>
  );
}
