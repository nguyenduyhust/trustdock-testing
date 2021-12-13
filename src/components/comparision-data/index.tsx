import React, { useState, useCallback, useMemo } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const NEXT_PUBLIC_TRUSTDOCK_BASE_URL = process.env.NEXT_PUBLIC_TRUSTDOCK_BASE_URL || '';
const NEXT_PUBLIC_TRUSTDOCK_TOKEN_API = process.env.NEXT_PUBLIC_TRUSTDOCK_TOKEN_API || '';

type Props = {}

const ComparisionData = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [verificationId, setVerificationId] = useState('');
  const onChangeVerificationId = useCallback((event: any) => {
    setVerificationId(event.target.value)
  }, [setVerificationId]);
  const [body, setBody] = useState('');
  const onChangeBody = useCallback((event: any) => {
    setBody(event.target.value)
  }, [setBody]);
  const isBodyValid = useMemo(() => {
    if (!body) {
      return false;
    }
    try {
      JSON.parse(body);
      return true;
    } catch (error) {
      return false;
    }
  }, [body]);
  const [compareDataLoading, setCompareDataLoading] = useState(false);
  const onCompareData = useCallback(async () => {
    setCompareDataLoading(true);
    try {
      await axios.put(
        `${NEXT_PUBLIC_TRUSTDOCK_BASE_URL}/verifications/${verificationId}/comparing_data`,
        JSON.parse(body),
        {
          headers: {
            Authorization: `Bearer ${NEXT_PUBLIC_TRUSTDOCK_TOKEN_API}`
          }
        }
      );
      enqueueSnackbar('Submit comparison data success', { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar(`Submit comparison data fail: ${error.message}`, { variant: 'error' });
    }
    setCompareDataLoading(false);
  }, [setCompareDataLoading, verificationId, body, enqueueSnackbar]);
  const isValid = isBodyValid && Boolean(verificationId);

  return (
    <Box>
      <Typography variant="h5">Submit comparison data</Typography>
      <Box marginTop={1}>
        <TextField label="Verification Id" variant="outlined" value={verificationId} onChange={onChangeVerificationId} size="small" fullWidth />
      </Box>
      <Box marginTop={1}>
        <TextField
          label="Body (JSON)"
          value={body}
          onChange={onChangeBody}
          multiline
          rows={10}
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          helperText={!isBodyValid && Boolean(body) && 'Invalid input'}
          error={!isBodyValid && Boolean(body)}
        />
      </Box>
      <Box marginTop={1}>
        <Button variant="contained" onClick={onCompareData} disabled={!isValid || compareDataLoading}>Submit</Button>
      </Box>
    </Box>
  )
}

export default ComparisionData

const placeholder = `{
  "name": "John Smith",
  "birth": "1975-06-01",
  "address": "2566 Tarumi, Tsu City, Mie Prefecture",
  "gender": "female"
}`;