'use client';

import { useRouter } from 'next/navigation';

const client_id = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
const authority = process.env.NEXT_PUBLIC_OAUTH_ISSUER;
const cognitoDomain = process.env.NEXT_PUBLIC_OAUTH_DOMAIN;
const redirect_uri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI;

/** Fix issue with react hooks */
export function getAccessTokenSync() {
  const keyName = `oidc.user:${authority}:${client_id}`;
  const user = sessionStorage.getItem(keyName);
  if (!user) return null;
  return JSON.parse(user).access_token;
}

export function useOAuthConfig() {
  const router = useRouter();
  // const signOutRedirect = () => {
  //   window.location.href = `${cognitoDomain}/logout?client_id=${client_id}&logout_uri=${encodeURIComponent(
  //     redirect_uri as string
  //   )}`;
  // };
  const signOutRedirect = () => {
    const logout_uri = `${cognitoDomain}/logout?client_id=${client_id}`;
    // router.push(logout_uri);
    router.replace(logout_uri);
    // window.location.href = `${logout_uri}`;
    // window.location.
  };
  const config = { client_id, authority, redirect_uri, signOutRedirect };
  return config;
}
