import { NextPage } from 'next'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider';
import NewVerification from '../src/components/new-verification';
import GetVerification from '../src/components/get-verification';
import ComparisionData from '../src/components/comparision-data';
import SelectKYC from '../src/components/select-kyc';

const Home: NextPage = () => {
  return (
    <Container maxWidth="md">
      <Box paddingTop={5} paddingBottom={5}>
        <NewVerification />
        <Box marginTop={2} marginBottom={2}>
          <Divider />
        </Box>
        <GetVerification />
        <Box marginTop={2} marginBottom={2}>
          <Divider />
        </Box>
        {/* <ComparisionData />
        <Box marginTop={2} marginBottom={2}>
          <Divider />
        </Box> */}
        <SelectKYC />
      </Box>
    </Container>
  )
}

export default Home
