import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { apiGet } from '../../../utils/server_utils';

export default withApiAuthRequired(async (req, res) =>
  apiGet(
    '/statistics/netWorth',
    req.headers.authorization,
    req.method,
    req.body
  )
    .then((expenseResult) => {
      res.status(200).json(expenseResult);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
);
