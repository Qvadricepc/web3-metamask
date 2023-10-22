import { useEffect, useState } from 'react'
import { getAccounts, getCHRBalance, getEthBalance } from '../web3-service.tsx'

export const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null)
  const [ethBalance, setEthBalance] = useState<string | undefined>('0')
  const [chrBalance, setCHRBalance] = useState<string | undefined>('0')

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

  useEffect(() => {
    if (window.ethereum) {
      const handleChainChanged = (chainId: string) => {
        console.log('New chain ID:', chainId)

        const supportedChains = ['0x1', '0x61']

        if (!supportedChains.includes(chainId)) {
          alert(
            'Unsupported network! Please switch to Ethereum mainnet or Binance Smart Chain testnet.'
          )
        }
      }

      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        window.ethereum?.removeListener?.('chainChanged', (chainId: string) => {
          console.log('Chain ID:', chainId)
        })
      }
    }
  }, [])

  useEffect(() => {
    if (account) {
      void getEthBalance(account).then(res => setEthBalance(res))
      void getCHRBalance(account).then(res => setCHRBalance(res))
    }
  }, [account]) // This useEffect will re-run if 'account' changes

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

  return { account, ethBalance, chrBalance, connectWallet }
}
