import { useState } from 'react'
import { Button, TextField, Paper, Container, Typography, CircularProgress } from '@mui/material'
import { sendETH } from '../web3-service.tsx'

export const SendCrypto = ({ currentAccount }: { currentAccount: string }) => {
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>('')

  const handleSend = async () => {
    setLoading(true)
    try {
      await sendETH(currentAccount, recipientAddress, amount)
      setLoading(false)
    } catch (e: any) {
      setLoading(false)
      setError(e.message)
    }
  }

  const isDisabled = () => {
    if (amount === '' || recipientAddress === '') return true
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
          onChange={e => {
            setError('')
            setRecipientAddress(e.target.value)
          }}
        />
        <TextField
          label='Amount'
          variant='outlined'
          fullWidth
          margin='normal'
          value={amount}
          onChange={e => {
            setError('')
            setAmount(e.target.value)
          }}
        />
        <Button disabled={isDisabled()} variant='contained' color='primary' onClick={handleSend}>
          {loading ? <CircularProgress /> : 'Send'}
        </Button>
      </Paper>
      {error && (
        <Typography color='red' textAlign='center'>
          {error}
        </Typography>
      )}
    </Container>
  )
}
