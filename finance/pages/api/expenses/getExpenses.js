import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { apiGet } from '../../../utils/server_utils';

export default withApiAuthRequired(async (req, res) =>
  apiGet('/expenses/me', req.headers.authorization)
    .then((userResult) => {
      res.status(200).json(userResult);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
);
