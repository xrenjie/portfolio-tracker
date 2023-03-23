import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  try {
    const { accessToken } = await getAccessToken(req, res, {
      audience: process.env.AUTH0_AUDIENCE,
      scopes: ['read:expenses'],
    });

    if (accessToken) res.status(200).json(accessToken);
    else res.status(500).json('Auth failed, no access token.');
  } catch (error) {
    res.status(500).json(error);
  }
});
