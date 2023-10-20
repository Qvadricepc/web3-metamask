import { useEffect, useState } from 'react'
import { getAccounts } from '../web3-service.tsx'

export const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null)

  const updateAccounts = async () => {
    try {
      const accounts = await getAccounts()
      if (accounts.length > 0) {
        setAccount(accounts[0])
      } else {
        setAccount(null)
      }
    } catch (error) {
      console.error('Error fetching accounts:', error)
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      void updateAccounts()

      // When MetaMask account changes
      window.ethereum.on('accountsChanged', updateAccounts)

      // Cleanup event listener
      return () => {
        if (window.ethereum?.removeListener) {
          window.ethereum.removeListener('accountsChanged', updateAccounts)
        }
      }
    }
  }, [])

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        const accounts = await getAccounts()

        if (accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          console.error('No accounts found.')
        }
      } catch (error) {
        console.error('Error accessing wallet:', error)
      }
    } else {
      console.error('Please install provider (MetaMask, etc.)')
    }
  }

  return { account, connectWallet }
}
