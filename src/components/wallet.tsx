import { Container, Grid, Paper, Typography } from '@mui/material'

export const Wallet = () => {
  const user = true
  return (
    <Container sx={{ marginTop: '100px' }}>
      {user ? (
        <>
          {/* Balance Overview */}
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant='h5'>Balance</Typography>
            <Typography variant='body1'>1.234 BTC</Typography>
            <Typography variant='body2'>≈ $45,678.90</Typography>
          </Paper>

          {/* Recent Transactions */}
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant='h5'>Recent Transactions</Typography>
            {/* You'd map over an array of transactions to display them here */}
            <Grid>
              <Typography variant='body1'>0.01 BTC received</Typography>
              <Typography variant='body2'>1 hour ago</Typography>
            </Grid>
            {/* ... more transactions */}
          </Paper>
        </>
      ) : (
        <Grid
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}
        >
          <Typography sx={{ fontSize: '32px' }}>Please connect a wallet</Typography>
        </Grid>
      )}
    </Container>
  )
}
