import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

interface INavbar {
  account: string | null
  connectWallet: () => Promise<void>
}

export const Navbar: React.FC<INavbar> = ({ account, connectWallet }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    setAnchorEl(null)
  }, [account])

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          Crypto Wallet
        </Typography>
        <Button color='inherit' onClick={handleMenuOpen}>
          wallet
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {account ? (
            <MenuItem>
              <Typography sx={{ fontSize: { xs: '8px', xl: '16px' } }}>
                Wallet address: {account}
              </Typography>
            </MenuItem>
          ) : (
            <MenuItem onClick={connectWallet}>Connect</MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
