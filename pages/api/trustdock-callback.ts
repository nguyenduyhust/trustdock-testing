import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const WEBHOOK_SECRET_KEY = process.env.WEBHOOK_SECRET_KEY || '';

type TrustDockWebhookData = Array<{
  type: string;
  data: any;
}>;
export const webhookData: TrustDockWebhookData = [];

export default function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isVerified = verifySignature(req);
  if (!isVerified) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  console.log('TrustDock callback');
  console.log('req.body: ', req.body);
  
  return res.status(200).json({ message: 'Success' });
}

const verifySignature = (req: NextApiRequest) => {
  try {
    const expectedSignature = `sha256=${crypto.createHmac('sha256', WEBHOOK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex')}`;
    const receivedSignature = req.headers['x-webhook-signature'];

    return expectedSignature === receivedSignature;
  } catch (error) {
    return false;    
  }
}