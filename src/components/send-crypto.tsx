import { useState } from 'react'
import { Button, TextField, Paper, Container, Typography } from '@mui/material'
import { sendETH } from '../web3-service.tsx'

export const SendCrypto = ({ currentAccount }: { currentAccount: string }) => {
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amount, setAmount] = useState('')

  const handleSend = () => {
    void sendETH(currentAccount, recipientAddress, amount)
  }

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant='h5' gutterBottom>
          Send Cryptocurrency
        </Typography>
        <TextField
          label='Recipient Address'
          variant='outlined'
          fullWidth
          margin='normal'
          value={recipientAddress}
          onChange={e => setRecipientAddress(e.target.value)}
        />
        <TextField
          label='Amount'
          variant='outlined'
          fullWidth
          margin='normal'
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <Button variant='contained' color='primary' onClick={handleSend}>
          Send
        </Button>
      </Paper>
    </Container>
  )
}
