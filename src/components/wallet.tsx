import { Container, Grid, Paper, Typography } from '@mui/material'
import { SendCrypto } from './send-crypto.tsx'

interface IWallet {
  account: string | null
  ethBalance: string | undefined
  chrBalance: string | undefined
  chainID: string | undefined
  error: string
}

export const Wallet: React.FC<IWallet> = ({ account, ethBalance, chrBalance, chainID, error }) => {
  return (
    <Container sx={{ marginTop: '100px' }}>
      {account ? (
        <>
          <Grid marginBottom='20px'>
            <Typography
              variant='h5'
              textAlign='center'
              color={chainID?.includes('Unsupported') ? 'red' : '#017BFE'}
            >
              {chainID}
            </Typography>
          </Grid>

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
      {error && (
        <Typography color='red' textAlign='center'>
          {error}
        </Typography>
      )}
    </Container>
  )
}
