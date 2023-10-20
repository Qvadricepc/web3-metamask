import Web3 from 'web3'

export const web3 =
  typeof window !== 'undefined' && window.ethereum ? new Web3(window.ethereum) : undefined

export const getAccounts = async (): Promise<string[]> => {
  if (!web3) {
    throw new Error('Web3 is not initialized.')
  }
  return await web3.eth.getAccounts()
}
