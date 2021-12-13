import { useState, useCallback } from 'react'
import { NextPage } from 'next'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';


const Home: NextPage = () => {
  const [publicId, setPublicId] = useState(undefined);
  const onPublicIdChange = useCallback((event) => {
    setPublicId(event.target.value);
  }, [setPublicId]);
  const [plan, setPlan] = useState(undefined);
  const onPlanChange = useCallback((event) => {
    setPlan(event.target.value);
  }, [setPlan]);
  const isValid = plan && publicId;
  const onSubmit = useCallback(() => {
    (window as any).open(`${window.location.origin}/kyc/${plan}/${publicId}`, '_blank').focus();
  }, [publicId, plan]);

  return (
    <div>
      <Container style={{ paddingTop: 200 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField select fullWidth variant="outlined" value={plan} onChange={onPlanChange}>
              {planOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Public Id" variant="outlined" value={publicId} onChange={onPublicIdChange} fullWidth />
          </Grid>
        </Grid>
          <Button variant="contained" style={{ marginTop: 20 }} onClick={onSubmit} disabled={!isValid}>Submit</Button>
      </Container>
    </div>
  )
}

export default Home

type PlanOption = {
  value: string;
  label: string;
}

export const planOptions: Array<PlanOption> = [
  { label: '犯罪収益移転防止法：ホ（WEB・アプリ）', value: '1dd9175a-8649-4629-a7c5-77b8a4ac9212' },
  { label: '補助書類確認業務(アプリ)', value: '204595da-661a-4c35-a94e-0852033e1a10' },
  { label: '犯罪収益移転防止法：ホ(SDK)', value: '44dfef66-193d-4989-bc1c-401affe3a706' },
  { label: '個人身元確認業務(WEB・アプリ)', value: '46adc976-b3f6-4772-b93e-5169c1fbc921' },
  { label: '個人身元確認業務(SDK)', value: 'be8c06ed-30dc-42ef-a0df-cf78f503d762' },
  { label: '法人確認業務', value: 'cdf87baa-c167-4a3b-9fad-a016811adc47' },
  { label: '補助書類確認業務(SDK)', value: 'e5bf7935-6d23-4ec5-b9d4-720320f96ad5' },
  { label: '法人確認業務（登記情報サービス）', value: 'e7fc94d8-e588-4a3e-b061-332f8845f7c0' },
]