import { useEffect, useState } from 'react'
import { getAccounts, getCHRBalance, getEthBalance, getNet } from '../web3-service.tsx'

export const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null)
  const [ethBalance, setEthBalance] = useState<string | undefined>('0')
  const [chrBalance, setCHRBalance] = useState<string | undefined>('0')
  const [chainID, setChainId] = useState<string | undefined>('')
  const [error, setError] = useState('')

  const updateAccounts = async () => {
    try {
      const accounts = await getAccounts()
      if (accounts.length > 0) {
        setAccount(accounts[0])
        await getNet().then(res => setChainId(res))
      } else {
        setAccount(null)
      }
    } catch (error) {
      setError(`Error fetching accounts: ${(error as Error).message}`)
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      void updateAccounts()

      window.ethereum.on('accountsChanged', updateAccounts)

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
        if (chainId === '0x1') setChainId('Ethereum Mainnet')
        if (chainId === '0x61') setChainId('Binance Smart Chain Testnet')

        const supportedChains = ['0x1', '0x61']

        if (!supportedChains.includes(chainId)) {
          setChainId(
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
  }, [account, chainID])

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        const accounts = await getAccounts()

        if (accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          setError('No accounts found.')
        }
      } catch (error) {
        setError(`Error accessing wallet: ${(error as Error).message}`)
      }
    } else {
      setError('Please install provider (MetaMask, etc.)')
    }
  }

  return { account, ethBalance, chrBalance, connectWallet, chainID, error }
}
