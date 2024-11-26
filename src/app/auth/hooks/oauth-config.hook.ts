'use client';
export function useOAuthConfig() {
  const client_id = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
  const authority = process.env.NEXT_PUBLIC_OAUTH_ISSUER;
  const cognitoDomain = process.env.NEXT_PUBLIC_OAUTH_DOMAIN;
  const signOutRedirect = () => {
    window.location.href = `${cognitoDomain}/logout?client_id=${client_id}`;
  };
  const redirect_uri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI;
  return { client_id, authority, redirect_uri, signOutRedirect };
}
