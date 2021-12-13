import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { planOptions } from '../../../src/components/select-kyc';

const NEXT_PUBLIC_TRUST_DOCK_JS_HELPER_URL = process.env.NEXT_PUBLIC_TRUST_DOCK_JS_HELPER_URL || 'https://helper.test.trustdock.io/v2/verification_helper.js';

const StartKYC: NextPage = () => {
  const router = useRouter();
  const { plan, publicId } = router.query as { plan: string, publicId: string };
  const isValid = plan && publicId;
  const [trustdockLoaded, setTrustdockLoaded] = useState(false);

  useEffect(() => {
    if (trustdockLoaded && isValid) {
      const trustdock = new (window as any).Trustdock({
        publicId: publicId,
        plans: [
          {
            id: plan,
          },
        ],
        openerSelector: `#opener`
      });

      // Function when an event is received
      trustdock.on('documentsubmitted', () => {
        console.log('TRUSTDOCK documentsubmitted');
        // Describe here a process to be executed when the submission of verification documents is complete.
        // e.g., Force-direct users to the next page if they don't close the modal window after submission
      })
      trustdock.on('completed', () => {
        console.log('TRUSTDOCK completed');
        // Describe here a process to be executed when the submission of verification documents is complete and the modal window is closed.
      })
      trustdock.on('canceled', () => {
        console.log('TRUSTDOCK canceled');
        // Describe here a process to be executed when the modal window is closed prior to submission of verification documents.
      });

      (window as any).trustdock = trustdock;
    }

  }, [plan, publicId, trustdockLoaded, isValid]);

  return (
    <Container maxWidth="md">
      <Script
        src={NEXT_PUBLIC_TRUST_DOCK_JS_HELPER_URL}
        onLoad={() => {
          setTrustdockLoaded(true);
        }}
      />
      <Box marginTop={10}>
        {plan && (
          <TextField select fullWidth variant="outlined" value={plan} disabled>
            {planOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
        <Box marginTop={1}>
          <TextField label="Public Id" variant="outlined" value={publicId} fullWidth disabled InputLabelProps={{ shrink: true }} />
        </Box>
        <Box marginTop={1}>
          <Button id="opener" className="opener" variant="contained" disabled={!trustdockLoaded}>Start KYC</Button>
        </Box>
      </Box>
    </Container >
  )
}

export default StartKYC