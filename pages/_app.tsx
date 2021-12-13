import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack';
import Collapse from '@mui/material/Collapse'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      TransitionComponent={Collapse}
      autoHideDuration={3000}
    >
      <Component {...pageProps} />
    </SnackbarProvider>
  )
}

export default MyApp
