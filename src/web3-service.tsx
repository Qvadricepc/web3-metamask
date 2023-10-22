import Web3 from 'web3'
import { CHR_ABI, CHR_ADDRESS } from './constants..ts'

export const web3 =
  typeof window !== 'undefined' && window.ethereum ? new Web3(window.ethereum) : undefined

export const getAccounts = async (): Promise<string[]> => {
  if (!web3) {
    throw new Error('Web3 is not initialized.')
  }
  return await web3.eth.getAccounts()
}

export const getEthBalance = async (account: string) => {
  if (web3) {
    const balanceWei = await web3.eth.getBalance(account)
    const balanceEth = Web3.utils.fromWei(balanceWei, 'ether')
    return balanceEth
  }
}

export const getCHRBalance = async (account: string) => {
  if (web3) {
    const chrTokenContract = new web3.eth.Contract(CHR_ABI, CHR_ADDRESS)
    const balance = await web3.eth.call({
      to: CHR_ADDRESS,
      data: chrTokenContract.methods.balanceOf(account).encodeABI(),
    })
    return balance
  }
}
