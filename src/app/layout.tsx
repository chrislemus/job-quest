import '@src/styles/bulma.sass';
import { PropsWithChildren } from 'react';

export default function RootLayout(p: PropsWithChildren<{}>) {
  return (
    <html>
      <head>
        <title>Job Quest</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://kit.fontawesome.com/30c44256a9.js"
          crossorigin="anonymous"
        ></script>
      </head>
      <body>{p.children}</body>
    </html>
  );
}
