import { handleLogin, handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      // Add the `offline_access` scope to also get a Refresh Token
      scope: 'openid profile email read:expenses offline_access', // or AUTH0_SCOPE
    },
  }),
});
