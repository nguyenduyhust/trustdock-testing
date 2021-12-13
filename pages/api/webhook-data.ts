import type { NextApiRequest, NextApiResponse } from 'next';
import { webhookData } from './trustdock-callback';

export default function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json([...webhookData].reverse().slice(0, 100));
}