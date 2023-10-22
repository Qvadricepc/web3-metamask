import { Container, Grid, Paper, Typography } from '@mui/material'
import { useWallet } from '../hooks/useWallet.tsx'
import { SendCrypto } from './send-crypto.tsx'

export const Wallet = () => {
  const { account, ethBalance, chrBalance } = useWallet()

  return (
    <Container sx={{ marginTop: '100px' }}>
      {account ? (
        <>
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant='h5'>{ethBalance}</Typography>
            <Typography variant='body1'>ETH</Typography>
          </Paper>

          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant='h5' fontSize={{ xs: '6px', sm: '10px', xl: '16px' }}>
              {chrBalance}
            </Typography>
            <Typography variant='body1'>CHR Token</Typography>
          </Paper>

          <SendCrypto currentAccount={account} />
        </>
      ) : (
        <Grid
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}
        >
          <Typography sx={{ fontSize: '32px' }}>Please connect your wallet</Typography>
        </Grid>
      )}
    </Container>
  )
}
