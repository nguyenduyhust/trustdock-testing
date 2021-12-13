import React, { useState, useCallback } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import JSONPretty from 'react-json-pretty';
import { useSnackbar } from 'notistack';

const TRUSTDOCK_BASE_URL = process.env.TRUSTDOCK_BASE_URL || 'https://api.test.trustdock.io/v2';
const TRUSTDOCK_TOKEN_API = process.env.TRUSTDOCK_BASE_URL || '37i38h8yDo3dPnhXruD8CPvE';

type Props = {}

const NewVerification = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [createNewVerificationLoading, setCreateNewVerificationLoading] = useState(false);
  const [createNewVerificationData, setCreateNewVerificationData] = useState<any>(undefined);
  const onCreateNewVerification = useCallback(async () => {
    setCreateNewVerificationLoading(true);
    try {
      const result = await axios.post(
        `${TRUSTDOCK_BASE_URL}/verifications`,
        undefined, {
        headers: {
          Authorization: `Bearer ${TRUSTDOCK_TOKEN_API}`
        }
      });
      setCreateNewVerificationData(result.data);
      enqueueSnackbar('Create new verification success', { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar(`Create new verification fail: ${error.message}`, { variant: 'error' });
    }
    setCreateNewVerificationLoading(false);
  }, [setCreateNewVerificationLoading, setCreateNewVerificationData, enqueueSnackbar]);

  return (
    <Box>
      <Typography variant="h5">Request verification</Typography>
      <Box marginTop={1}>
        <Button variant="contained" onClick={onCreateNewVerification} disabled={createNewVerificationLoading}>Submit</Button>
      </Box>
      {createNewVerificationData && (
        <Box marginTop={1} bgcolor="#272823">
          <JSONPretty style={{ color: '#ffffff', overflowX: 'auto', padding: '10px' }} data={createNewVerificationData} />
        </Box>
      )}
    </Box>
  )
}

export default NewVerification
