import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

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
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          {/* Add more MenuItems here if needed */}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
