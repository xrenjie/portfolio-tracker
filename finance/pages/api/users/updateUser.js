import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { apiPut } from '../../../utils/server_utils';

export default withApiAuthRequired(async (req, res) =>
  apiPut('/users/me', req.headers.authorization, req.body)
    .then((userResult) => {
      res.status(200).json(userResult);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
);
