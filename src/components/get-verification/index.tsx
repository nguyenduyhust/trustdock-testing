import React, { useState, useCallback } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import JSONPretty from 'react-json-pretty';
import { useSnackbar } from 'notistack';

const NEXT_PUBLIC_TRUSTDOCK_BASE_URL = process.env.NEXT_PUBLIC_TRUSTDOCK_BASE_URL || '';
const NEXT_PUBLIC_TRUSTDOCK_TOKEN_API = process.env.NEXT_PUBLIC_TRUSTDOCK_TOKEN_API || '';

type Props = {}

const GetVerification = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [verificationId, setVerificationId] = useState('');
  const onChangeVerificationId = useCallback((event: any) => {
    setVerificationId(event.target.value)
  }, [setVerificationId]);
  const [getVerificationLoading, setGetVerificationLoading] = useState(false);
  const [getVerificationData, setGetVerificationData] = useState<any>(undefined);
  const onGetVerification = useCallback(async () => {
    setGetVerificationLoading(true);
    try {
      const result = await axios.get(
        `${NEXT_PUBLIC_TRUSTDOCK_BASE_URL}/verifications/${verificationId}`, {
        headers: {
          Authorization: `Bearer ${NEXT_PUBLIC_TRUSTDOCK_TOKEN_API}`
        }
      });
      setGetVerificationData(result.data);
      enqueueSnackbar('Get verification success', { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar(`Get verification fail: ${error.message}`, { variant: 'error' });
    }
    setGetVerificationLoading(false);
  }, [setGetVerificationLoading, setGetVerificationData, verificationId, enqueueSnackbar]);
  const isValid = Boolean(verificationId);

  return (
    <Box>
      <Typography variant="h5">Get verification</Typography>
      <Box marginTop={1}>
        <TextField label="Verification Id" variant="outlined" value={verificationId} onChange={onChangeVerificationId} size="small" fullWidth />
      </Box>
      <Box marginTop={1}>
        <Button variant="contained" onClick={onGetVerification} disabled={!isValid || getVerificationLoading}>Submit</Button>
      </Box>
      {getVerificationData && (
        <Box marginTop={1} bgcolor="#272823">
          <JSONPretty style={{ color: '#ffffff', overflowX: 'auto', padding: '10px' }} data={getVerificationData} />
        </Box>
      )}
    </Box>
  )
}

export default GetVerification
