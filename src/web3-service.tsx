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

export const sendETH = async (fromAddress: string, toAddress: string, amountInEther: string) => {
  if (web3) {
    const amountInWei = web3.utils.toWei(amountInEther, 'ether')

    // Checking balance of fromAddress
    const balance = await web3.eth.getBalance(fromAddress)
    if (parseInt(balance, 10) < parseInt(amountInWei, 10)) {
      throw new Error('Insufficient balance')
    }

    const gasPrice = await web3.eth.getGasPrice()
    const gasLimit = await web3.eth.estimateGas({
      from: fromAddress,
      to: toAddress,
      value: amountInWei,
    })

    try {
      const transactionReceipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: toAddress,
        value: amountInWei,
        gasPrice,
        gas: gasLimit,
      })

      return transactionReceipt
    } catch (error) {
      console.error('Error sending ETH:', error)
      throw error
    }
  }
}

export const getNet = async () => {
  if (web3) {
    const result = await web3.eth.net.getId().then(netId => {
      console.log(netId)
      switch (netId) {
        case 1n:
          return 'Ethereum Mainnet'
          break
        case 97n:
          return 'Binance Smart Chain'
          break
        default:
          return 'Unknown Network'
      }
    })
    return result
  }
}
