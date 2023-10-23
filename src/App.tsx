import { Box } from '@mui/material'
import { Navbar } from './components/navbar.tsx'
import { Wallet } from './components/wallet.tsx'
import { useWallet } from './hooks/useWallet.tsx'

export const App = () => {
  const { account, connectWallet, ethBalance, chrBalance, chainID, error } = useWallet()
  return (
    <Box>
      <Navbar account={account} connectWallet={connectWallet} />
      <Wallet
        account={account}
        ethBalance={ethBalance}
        chrBalance={chrBalance}
        chainID={chainID}
        error={error}
      />
    </Box>
  )
}
