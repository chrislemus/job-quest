'use client';
import { useAuth } from 'react-oidc-context';
import { useOAuthConfig } from '@/app/auth/hooks';

export default function App() {
  const auth = useAuth();
  const { signOutRedirect } = useOAuthConfig();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}
